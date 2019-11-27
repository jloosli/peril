import {Inject, Injectable} from '@angular/core';
import {EventType, GAME_ID, RTCMessage, RtcService} from '@service/rtc/rtc.service';
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

  constructor(@Inject(GAME_ID) protected gameID: string) {
    super();
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
        return this.peer.connect(this.gameID || id, {
          metadata: {clientType, playerId},
        });
      }),
      tap(connection => {
        // if (!connection.open) {
        //   throw new Error('Connection not opened');
        // }
        this.setUpDataConnection(connection);
      }),
      // catchError((err, caught) => {
      //   console.error(err);
      //   return caught;
      // }),
    ).toPromise();
  }

  send(message: RTCMessage) {
    super.send(message, this._baseConnection$.getValue());
  }
}
