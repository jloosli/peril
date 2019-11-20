import {Inject, Injectable} from '@angular/core';
import {ClientType, EventType, PEER_SERVICE, RTCMessage, RtcService} from '@service/rtc/rtc.service';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import Peer from 'peerjs';
import {filter, map, take} from 'rxjs/operators';
import {PlayersService} from '@service/players.service';


@Injectable({
  providedIn: 'root',
})
export class RtcBaseService extends RtcService {

  private _clientData$ = new Subject<{ connection: Peer.DataConnection, message: RTCMessage }>();
  clientData$ = this._clientData$.asObservable();

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

  allConnected$ = combineLatest([this.playersSvc.players$, this.playerConnections$, this.hostConnection$]).pipe(
    map(([players, playerConnections, host]) => {
      return Boolean(host) && players.length === playerConnections.length;
    }),
  );


  constructor(@Inject(PEER_SERVICE) protected peer: Peer, private playersSvc: PlayersService) {
    super(peer);
    this.setClientType(ClientType.Base);
    this.peerEvents.connection$.subscribe(conn => this.setUpDataConnection(conn));

    this.allConnected$
      .pipe(
        filter(Boolean),
      )
      .subscribe(() => this.sendToAll({eventType: EventType.Init}));
  }

  setUpDataConnection(connection: Peer.DataConnection) {
    connection.on('open', () => {
      console.log(`Opened connection to:  ${connection.peer} as ${connection.metadata.clientType}`);
      const connections = {...this._connections$.getValue()};
      connections[connection.peer] = connection;
      this._connections$.next(connections);
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
    connection.on('error', (err) => console.error(err));
  }

  sendToAll(message: RTCMessage) {
    this.connections$.pipe(
      take(1),
    ).subscribe(connections => {
      Object.keys(connections).forEach(id => {
        this.send(message, connections[id]);
      });
    });
  }
}
