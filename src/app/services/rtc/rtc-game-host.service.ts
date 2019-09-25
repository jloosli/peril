import {Injectable} from '@angular/core';
import {ClientType, EventType, RTCMessage, RtcService} from '@service/rtc/rtc.service';
import * as Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class RtcGameHostService extends RtcService {

  baseConnection: Peer.DataConnection;

  constructor() {
    super();
    this.setClientType(ClientType.GameHost);
  }

  ready(connection: Peer.DataConnection) {
    connection.on('open', () => {
      console.log(`Opened connection to base:  ${connection.peer}`);
      this.baseConnection = connection;
    });
    connection.on('data', (data: RTCMessage) => {
      console.log('Received from base:', data);
      switch (data.eventType) {
        case EventType.Error:
          console.error(data);
          break;

      }
    });
  }

}
