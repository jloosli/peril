import {inject, Injectable, InjectionToken} from '@angular/core';
import Peer from 'peerjs';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {PeerHash} from '@service/rtc/peer-hash';

export enum ClientType {
  Base = 'base',
  Player = 'player',
  GameHost = 'host'
}

export enum EventType {
  Init,
  Buzz,
  IsAnswer,
  Locked,
  Selection,
  Message
}

export interface RTCMessage {
  eventType: EventType;
  message?: string;
}

// @todo: Maybe use this? https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42
export const PEER_SERVICE_WITH_ID = new InjectionToken<Peer>('Peer.js service', {
  providedIn: 'root',
  factory: () => {
    return new Peer(inject(GAME_ID), {debug: 2, secure: true});
  },
});

export const GAME_ID = new InjectionToken<string>('Host Peer ID', {
  providedIn: 'root',
  factory: () => 'abc',
});

export const PEER_SERVICE_AUTO_ID = new InjectionToken<Peer>('Peer.js service with auto generated id', {
  providedIn: 'root',
  factory: () => new Peer(undefined, {debug: 2, secure: true}),
});


@Injectable({
  providedIn: 'root',
})
export abstract class RtcService {

  private _myType = new ReplaySubject<ClientType>(1);
  myType$ = this._myType;

  peerOpen$: Observable<void> = new Observable(sub => {
    const openHandler = () => sub.next();
    this.peer.on('open', openHandler);
    return () => this.peer.off('open', openHandler);
  });
  peerConnections$: Observable<PeerHash> = new Observable(sub => {
    const connectionHandler = () => {
      const connections = this.peer.connections;
      const cleanedConnections = {};
      Object.keys(connections).forEach(id => cleanedConnections[id] = connections[id][0]);
      sub.next(cleanedConnections);
    };
    connectionHandler();
    this.peer.on('connection', connectionHandler);
    return () => this.peer.off('connection', connectionHandler);
  }).pipe(
    distinctUntilChanged((prev, curr) => {
      const prevSet = new Set(Object.keys(prev));
      const currSet = new Set(Object.keys(curr));
      if (prevSet.size !== currSet.size) {
        return false;
      }
      for (const p of prevSet) {
        if (!currSet.has(p)) {
          return false;
        }
      }
      return true;
    }),
    shareReplay({bufferSize: 1, refCount: true}),
  ) as Observable<{ [id: string]: Peer.DataConnection }>;
  peerNewConnection$: Observable<Peer.DataConnection> = new Observable(sub => {
    const newConnectionHandler = (conn) => sub.next(conn);
    this.peer.on('connection', newConnectionHandler);
    return () => this.peer.off('connection', newConnectionHandler);
  });
  peerClose$: Observable<void> = new Observable(sub => {
    const closeHandler = () => sub.next();
    this.peer.on('close', closeHandler);
    return () => this.peer.off('close', closeHandler);
  });
  peerDisconnected$: Observable<void> = new Observable(sub => {
    const disconnectedHandler = () => sub.next();
    this.peer.on('disconnected', disconnectedHandler);
    return () => this.peer.off('disconnected', disconnectedHandler);
  });
  peerError$: Observable<any> = new Observable(sub => {
    const errorHandler = (err) => sub.next(err);
    this.peer.on('error', errorHandler);
    return () => this.peer.off('error', errorHandler);
  });
  private _id$ = new BehaviorSubject<string | undefined>(undefined);
  id$ = this._id$.asObservable().pipe(distinctUntilChanged());
  private _clientData$ = new Subject<{ connection: Peer.DataConnection, message: RTCMessage }>();
  clientData$ = this._clientData$.asObservable();
  private subscribedPeerIds = new Set<string>();

  protected constructor() {
    const isGame = /^\/game/.test(window.location.pathname);
    if (isGame) {
      const parts = window.location.pathname.split('/');
      if (parts.length > 2) {
        const gameId = parts[2];
        this._id$.next(gameId);
      }
    }
  }

  protected _peer: Peer;

  protected get peer(): Peer {
    if (!this._peer) {
      this._peer = new Peer(this._id$.getValue(), {debug: 2});
    }
    return this._peer;
  }

  send(message: RTCMessage, connection: Peer.DataConnection,
  ) {
    connection.send(message);
  }

  setClientType(clientType: ClientType) {
    this._myType.next(clientType);
  }

  private addRemoveDataListeners(connections: PeerHash) {
    Object.keys(connections).forEach(id => {
      connections[id].on('data', (data => this._clientData$.next({
        connection: connections[id],
        message: data,
      })));
      connections[id].on('close', () => this.subscribedPeerIds.delete(id));
    });
    // Remove missing connections
    for (const id in this.subscribedPeerIds) {
      if (!(id in connections)) {
        console.warn('Found some loose connections');
        this.subscribedPeerIds.delete(id);
      }
    }
  }
}
