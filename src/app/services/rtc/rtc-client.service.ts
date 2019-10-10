import {Injectable} from '@angular/core';
import {RtcService} from '@service/rtc/rtc.service';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class RtcClientService extends RtcService {

  constructor() {
    super();
  }

  ready(connection: Peer.DataConnection) {
  }
}
