import {Inject, Injectable, InjectionToken} from '@angular/core';
import Peer from 'peerjs';
import {BehaviorSubject, merge, of, ReplaySubject, Subject, zip} from 'rxjs';
import {delay, map, shareReplay, take, tap} from 'rxjs/operators';

export enum ClientType {
  Base = 'base',
  Player = 'player',
  GameHost = 'host'
}

export enum EventType {
  Init,
  Error,
  IsAnswer,
  Locked,
  Selection
}

export interface RTCMessage {
  eventType?: EventType;
  clientType?: ClientType;
  playerId?: string;
  message?: string;
}

export const PEER_SERVICE = new InjectionToken<Peer>('Peer.js service', {
  providedIn: 'root',
  factory: () => new Peer(null, {debug: 2, secure: true}),
});


@Injectable({
  providedIn: 'root',
})
export abstract class RtcService {



  private _myType = new ReplaySubject<ClientType>();
  myType$ = this._myType.pipe(
    shareReplay({bufferSize: 1, refCount: true}),
  );

  private _id$ = new ReplaySubject<string>();
  id$ = this._id$.asObservable();

  protected _peerEvents = {
    open$: new Subject<void>(),
    connection$: new ReplaySubject<Peer.DataConnection>(),
    close$: new Subject<void>(),
    disconnected$: new Subject<void>(),
    error$: new ReplaySubject<any>(),
  };

  peerEvents = {
    open$: this._peerEvents.open$.asObservable(),
    connection$: this._peerEvents.connection$.asObservable(),
    close$: this._peerEvents.close$.asObservable(),
    disconnected$: this._peerEvents.disconnected$.asObservable(),
    error$: this._peerEvents.error$.asObservable(),
  };


  protected constructor(@Inject(PEER_SERVICE) protected peer: Peer) {
    this.init();
    const events$ = Object.keys(this.peerEvents).map(evt => zip(...[of(evt), this.peerEvents[evt]]));
    merge(...events$)
      .subscribe(([eventType, result]) => {
        console.log(eventType, result);
      });
  }

  private init() {
    this.peer.on('open', () => {
      this._peerEvents.open$.next();
      this._id$.next(this.peer.id);
    });
    this.peer.on('connection', (conn) => this._peerEvents.connection$.next(conn));
    this.peer.on('disconnected', () => this._peerEvents.disconnected$.next());
    this.peer.on('close', () => this._peerEvents.close$.next());
    this.peer.on('error', (err) => this._peerEvents.error$.next(err));

  }

  setClientType(clientType: ClientType) {
    this._myType.next(clientType);
  }

  send(message: RTCMessage, connection: Peer.DataConnection) {
    connection.send(message);
  }
}
