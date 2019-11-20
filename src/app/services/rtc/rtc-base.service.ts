import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ClientType, EventType, PEER_SERVICE, RTCMessage, RtcService} from '@service/rtc/rtc.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import Peer from 'peerjs';
import {map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RtcBaseService extends RtcService {

  private _clientData$ = new Subject<{ connection: Peer.DataConnection, message: RTCMessage }>();
  clientData$=this._clientData$.asObservable();

  private _connections$ = new BehaviorSubject<{ [id: string]: Peer.DataConnection }>({});
  connections$ = this._connections$.asObservable();

  hostConnection$: Observable<Peer.DataConnection | undefined> = this.connections$.pipe(
    map(connections => {
      const hostConnectionId = Object.keys(connections).find(id => connections[id].metadata.clientType === ClientType.GameHost);
      return hostConnectionId ? connections[hostConnectionId] : undefined;
    }),
  );

  playerConnections$: Observable<Peer.DataConnection[]> = this.connections$.pipe(
    map(connections => {
      return Object.keys(connections).filter(id => connections[id].metadata.clientType === ClientType.Player)
        .map(id => connections[id]);
    }),
  );


  constructor(@Inject(PEER_SERVICE) protected peer: Peer) {
    super(peer);
    this.setClientType(ClientType.Base);
    this.peerEvents.connection$.pipe(
      tap(x => console.log(x)),
    ).subscribe(conn => this.setUpDataConnection(conn));
  }

  setUpDataConnection(connection: Peer.DataConnection) {
    this.send({
      message: 'I see you from the base in setUpDatConnection',
    }, connection);
    connection.on('open', () => {
      console.log(`Opened connection to:  ${connection.peer} as ${connection.metadata.clientType}`);
      const connections = {...this._connections$.getValue()};
      connections[connection.peer] = connection;
      this._connections$.next(connections);
      this.send({
        message: 'I see you from the base [open]',
      }, connection);
    });
    connection.on('close', () => {
      console.log(`Closed connection to:  ${connection.peer} as ${connection.metadata.clientType}`);
      const connections = {...this._connections$.getValue()};
      delete connections[connection.peer];
      this._connections$.next(connections);
    });
    connection.on('data', (message: RTCMessage) => {
      console.log('Received:', message, connection.metadata);
      this._clientData$.next({connection, message});
    });


  }
}
