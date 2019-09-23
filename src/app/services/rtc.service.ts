import {Injectable} from '@angular/core';
import * as Peer from 'peerjs';

export enum ClientType {
  Main,
  Team,
  Host
}


@Injectable({
  providedIn: 'root',
})
export class RtcService {

  peer = new Peer(null, {debug: 2});

  constructor() {
    console.log('initialized');
    console.log(this.peer.id);
  }

  private genId() {
    return Math.random().toString(36).substring(2, 5);
  }
}
