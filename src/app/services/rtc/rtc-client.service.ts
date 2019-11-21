import {Inject, Injectable} from '@angular/core';
import {EventType, PEER_SERVICE, RTCMessage, RtcService} from '@service/rtc/rtc.service';
import Peer from 'peerjs';
import {BehaviorSubject, Subject} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RtcClientService extends RtcService {

  protected _data$ = new Subject<RTCMessage>();
  data$ = this._data$.asObservable();

  protected _baseConnection$ = new BehaviorSubject<Peer.DataConnection | undefined>(null);
  baseConnection$ = this._baseConnection$.asObservable();

  constructor(@Inject(PEER_SERVICE) protected peer: Peer) {
    super(peer);
  }

  setUpDataConnection(connection: Peer.DataConnection) {
    connection.on('open', () => {
        console.log('Opened Data connection to base');
        this._baseConnection$.next(connection);
        this.send({
          eventType: EventType.Message,
          message: 'I see you from the client',
        });
      },
    );
    connection.on('close', () => {
      console.log('Closed Data connection to base');
      this._baseConnection$.next(null);
    });
    connection.on('error', (err) => console.error(err));
    connection.on('data', (data) => {
      console.log('Received from base', data);
      this._data$.next(data);
    });
  }

  connect(id, playerId?: string): Promise<Peer.DataConnection> {
    return this.myType$.pipe(
      take(1),
      map(clientType => {
        return this.peer.connect(id, {
          metadata: {clientType, playerId},
        });
      }),
      tap(connection => this.setUpDataConnection(connection)),
    ).toPromise();
  }

  send(message: RTCMessage) {
    super.send(message, this._baseConnection$.getValue());
  }
}
