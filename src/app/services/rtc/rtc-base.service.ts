import {Injectable} from '@angular/core';
import {ClientType, EventType, RTCMessage, RtcService} from '@service/rtc/rtc.service';
import {combineLatest, Observable} from 'rxjs';
import Peer from 'peerjs';
import {distinctUntilChanged, filter, map, take, tap} from 'rxjs/operators';
import {PlayersService} from '@service/players.service';
import {PeerHash} from '@service/rtc/peer-hash';


const filterClientType = (searchedClientType: ClientType) => map((connections: PeerHash) => {
  return Object.keys(connections).filter(id =>
    connections[id]
    && connections[id].metadata
    && connections[id].metadata.clientType
    && connections[id].metadata.clientType === searchedClientType)
    .map(id => connections[id]);
});

@Injectable({
  providedIn: 'root',
})
export class RtcBaseService extends RtcService {
  buzz$ = this.clientData$.pipe(
    filter(msg => msg.message.eventType === EventType.Buzz),
  );
  hostConnection$: Observable<Peer.DataConnection | undefined> = this.peerConnections$.pipe(
    filterClientType(ClientType.GameHost),
    map(connections => connections.length === 1 ? connections[0] : undefined),
  );

  playerConnections$: Observable<Peer.DataConnection[]> = this.peerConnections$.pipe(
    tap(connections => console.log(connections)),
    filterClientType(ClientType.Player),
  );

  allConnected$ = combineLatest([this.playersSvc.players$, this.playerConnections$]).pipe(
    map(([players, playerConnections]) => {
      return players.length === playerConnections.length;
    }),
    distinctUntilChanged(),
  );


  constructor(private playersSvc: PlayersService) {
    super();
    this.setClientType(ClientType.Base);

    this.allConnected$
      .pipe(
        filter(Boolean),
      )
      .subscribe(() => this.sendToAll({eventType: EventType.Init}));
  }

  sendToAll(message: RTCMessage) {
    this.peerConnections$.pipe(
      take(1),
    ).subscribe(connections => {
      Object.keys(connections).forEach(id => {
        this.send(message, connections[id]);
      });
    });
  }
}
