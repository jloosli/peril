import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '@interface/player';
import {RtcBaseService} from '@service/rtc/rtc-base.service';
import {PlayersService} from '@service/players.service';
import {PlatformLocation} from '@angular/common';
import {ClientType} from '@service/rtc/rtc.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectComponent implements OnInit, OnDestroy {

  vm$: Observable<{ peerId: string, players: Player[], showHost: boolean, connections: string[] }>;
  active = true;

  constructor(private rtcSvc: RtcBaseService, private playersSvc: PlayersService, private platformLoc: PlatformLocation) {
    this.rtcSvc.setClientType(ClientType.Base);
  }

  ngOnInit() {
    this.vm$ = combineLatest([
      this.playersSvc.players$,
      this.rtcSvc.hostConnection$,
      this.rtcSvc.playerConnections$,
      this.rtcSvc.id$,
    ]).pipe(
      map(([
             players,
             hostConnection,
             playerConnections,
             id,
           ]) => {
        const connectedPlayerIds = playerConnections.map(connection => connection.metadata.playerId);
        return {
          peerId: id,
          players: players
            .filter(player => !connectedPlayerIds.includes(player.id)),
          showHost: false, // !Boolean(hostConnection),
          connections: connectedPlayerIds,
        };
      }),
    );

  }

  ngOnDestroy(): void {
    this.active = false;
  }

  formatLink(type: 'host' | 'player', peerId: string, player?: Player) {
    let link = (this.platformLoc as any).location.origin;
    link += `/${type};gameId=${peerId}`;
    if (player) {
      link += `;playerId=${player.id};playerName=${player.name}`;
    }
    return link;
  }

}
