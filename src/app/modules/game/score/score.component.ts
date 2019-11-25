import {Component, OnInit} from '@angular/core';
import {PlayersService} from '@service/players.service';
import {combineLatest, Observable} from 'rxjs';
import {Player} from '@interface/player';
import {map} from 'rxjs/operators';
import {RtcBaseService} from '@service/rtc/rtc-base.service';
import Peer from 'peerjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  vm$: Observable<{ players: Array<Player & { connected: boolean }> }>;

  constructor(private teamsSvc: PlayersService, private rtcSvc: RtcBaseService) {
    this.vm$ = combineLatest([this.teamsSvc.players$, this.rtcSvc.playerConnections$]).pipe(
      map(([players, playerConnections]: [Player[], Peer.DataConnection[]]) => ({
        players: players.map(player => {
          const connected = playerConnections.map(connection => connection.metadata.playerId).includes(player.id);
          return {...player, connected};
        }),
      })),
    );
  }

  ngOnInit() {
  }

}
