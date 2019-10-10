import {Injectable} from '@angular/core';
import Peer from 'peerjs';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export enum ClientType {
  Base,
  Player,
  GameHost
}

export enum EventType {
  Init,
  Error,
  IsAnswer,
  Locked,
  Selection
}

export interface RTCMessage {
  eventType: EventType;
  clientType?: ClientType;
  playerId?: string;
  message?: string;
}


@Injectable({
  providedIn: 'root',
})
export abstract class RtcService {

  private _myType = new ReplaySubject<ClientType>();
  myType$ = this._myType.pipe(
    shareReplay({bufferSize: 1, refCount: true}),
  );
  peerId$ = new BehaviorSubject<string>(null);
  lastPeerId: string;

  peer: Peer;
  protected _data$ = new Subject<RTCMessage>();
  data$ = this._data$.asObservable();
  protected _baseConnection$ = new BehaviorSubject<Peer.DataConnection>(null);
  baseConnection$ = this._baseConnection$.asObservable();

  protected constructor(id?: string) {
    this.peer = new Peer(id, {debug: 2});
    this.init();
  }

  // Each type needs to implement a ready method to handle interactions
  abstract ready(connection: Peer.DataConnection);

  setClientType(clientType: ClientType) {
    this._myType.next(clientType);
  }

  send(message: RTCMessage, connection: Peer.DataConnection) {
    connection.send(message);
  }

  connect(id, clientType: ClientType, playerId?: string): Peer.DataConnection {
    const connection = this.peer.connect(id, {
      metadata: {clientType, playerId},
    });
    connection.on('open', () => {
      console.log(`Connected to: ${connection.peer}`);
      const initialMessage: RTCMessage = {clientType, eventType: EventType.Init};
      if (playerId) {
        initialMessage.playerId = playerId;
      }
      connection.send(initialMessage);
    });
    connection.on('data', (data) => {
      console.log('Received: ', data);
      this._data$.next(data);
    });
    connection.on('close', () => {
      console.log('Closed Connection');
    });
    return connection;
  }

  private init() {
    this.peer.on('open', (id) => {
      // Workaround for peer.reconnect deleting previous id
      if (this.peer.id === null) {
        console.log('Received null id from peer open');
        this.peer.id = this.lastPeerId;
      } else {
        this.lastPeerId = this.peer.id;
      }
      console.log('ID: ' + this.peer.id);
      this.peerId$.next(this.peer.id);
      console.log('Awaiting connection...');
    });

    this.peer.on('connection', (c) => {
      console.log(`connected to: ${c.peer}`);
      this.ready(c);
    });

    this.peer.on('disconnected', () => {
      console.log('disconnected');
    });

    this.peer.on('close', () => {
      console.log('Connection destroyed');
    });

    this.peer.on('error', (err) => {
      console.error(err);
    });
  }


}
