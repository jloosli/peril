import {Injectable} from '@angular/core';
import {ClientType, EventType, RTCMessage, RtcService} from '@service/rtc/rtc.service';
import {BehaviorSubject} from 'rxjs';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class RtcBaseService extends RtcService {

  private _playerConnections = new BehaviorSubject<{ [id: string]: Peer.DataConnection }>({});
  playerConnections$ = this._playerConnections.asObservable();

  private _hostConnection$ = new BehaviorSubject<Peer.DataConnection>(null);
  hostConnection$ = this._hostConnection$.asObservable();


  constructor() {
    super('abcd');
    this.setClientType(ClientType.Base);
  }

  ready(connection: Peer.DataConnection) {
    connection.on('open', () => {
      console.log(`Opened connection to:  ${connection.peer}`);
    });
    connection.on('data', (data: RTCMessage) => {
      console.log('Received:', data);
      this._data$.next(data);
      switch (data.eventType) {
        case EventType.Init:
          switch (data.clientType) {
            case ClientType.GameHost:
              if (this._hostConnection$.getValue()) {
                this.send({eventType: EventType.Error, message: 'Already connected to a host'}, connection);
                setTimeout(() => connection.close, 500);
              } else {
                this._hostConnection$.next(connection);
                connection.on('close', () => this._hostConnection$.next(null));
                console.log('Connected to host!');
              }
              break;
            case ClientType.Player:
              const playerConnections = this._playerConnections.getValue();
              if (playerConnections[data.playerId]) {
                this.send({eventType: EventType.Error, message: 'Already connected to this player'}, connection);
                setTimeout(() => connection.close, 500);
              } else {
                playerConnections[data.playerId] = connection;
                this._playerConnections.next(playerConnections);
                connection.on('close', () => {
                  delete playerConnections[data.playerId];
                  this._playerConnections.next(playerConnections);
                });
              }
              break;
          }
      }

    });


  }
}
