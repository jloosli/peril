import {Injectable} from '@angular/core';

export enum ClientType {
  Main,
  Team,
  Host
}


@Injectable({
  providedIn: 'root',
})
export class RtcService {

  constructor() {
  }

  private genId() {
    return Math.random().toString(36).substring(2, 5);
  }
}
