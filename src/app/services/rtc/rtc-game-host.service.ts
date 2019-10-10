import {Injectable} from '@angular/core';
import {ClientType, EventType, RTCMessage, RtcService} from '@service/rtc/rtc.service';
import * as Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class RtcGameHostService extends RtcService {


  constructor() {
    super();
    this.setClientType(ClientType.GameHost);
  }

  connect(id, clientType: ClientType, playerId?: string): Peer.DataConnection {
    const connection = super.connect(id, clientType, playerId);
    this._baseConnection$.next(connection);
    return connection;
  }

  ready(connection: Peer.DataConnection) {
    debugger;
    console.log('Hey...I\'m here');
    console.log(connection);
    connection.on('open', () => {
      console.log(`Opened connection to base:  ${connection.peer}`);
      this._baseConnection$.next(connection);
    });
    connection.on('data', (data: RTCMessage) => {
      console.log('Received from base:', data);
      switch (data.eventType) {
        case EventType.Error:
          console.error(data);
          break;

      }
    });
    connection.on('close', () => this._baseConnection$.next(null));
  }

}
