import {Injectable} from '@angular/core';
import Peer from 'peerjs';
import {BehaviorSubject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

export enum ClientType {
  Main,
  Player,
  Host
}

export enum EventType {
  Init,
  Error
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
export class RtcService {

  myType: ClientType;
  mainConnection: any;
  peerId$ = new BehaviorSubject<string>(null);
  lastPeerId: string;
  hostConnection: any;

  peer = new Peer(null, {debug: 2});
  playersConnections: any = {};
  private _clientConnection$ = new BehaviorSubject(false);
  clientConnection$ = this._clientConnection$.asObservable().pipe(
    shareReplay({refCount: true, bufferSize: 1}),
  );

  constructor() {
    console.log('initialized');
    console.log(this.peer.id);
    this.init();
  }

  ready(connection) {
    connection.on('open', () => {
      console.log(`Opened connection to:  ${connection.peer}`);
    });
    connection.on('data', (data: RTCMessage) => {
      console.log('Received:', data);
      switch (data.eventType) {
        case EventType.Init:
          switch (data.clientType) {
            case ClientType.Host:
              if (this.hostConnection) {
                this.send({eventType: EventType.Error, message: 'Already connected to a host'}, connection);
                setTimeout(() => connection.close, 500);
              } else {
                this.hostConnection = connection;
                console.log('Connected to host!');
              }
              break;
            case ClientType.Player:
              if (this.playersConnections[data.playerId]) {
                this.send({eventType: EventType.Error, message: 'Already connected to this player'}, connection);
                setTimeout(() => connection.close, 500);
              } else {
                this.playersConnections[data.playerId] = connection;
              }
          }
      }

    });
  }

  send(message: RTCMessage, connection: any) {
    connection.send(message);
  }

  join(id, clientType: ClientType, playerId?: string) {
    if (this.mainConnection) {
      this.mainConnection.close();
    }
    this.mainConnection = this.peer.connect(id, {
      reliable: true,
    });
    this.mainConnection.on('open', () => {
      console.log(`Connected to: ${this.mainConnection.peer}`);
      const initialMessage: RTCMessage = {clientType, eventType: EventType.Init};
      if (playerId) {
        initialMessage.playerId = playerId;
      }
      this.mainConnection.send(initialMessage);
    });
    this.mainConnection.on('data', (data) => {
      console.log('Received: ', data);
    });
    this.mainConnection.on('close', () => {
      console.log('Closed Connection');
    });
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

  private genId() {
    return Math.random().toString(36).substring(2, 5);
  }
}
