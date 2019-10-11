import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Player} from '@interface/player';
import {RtcBaseService} from '@service/rtc/rtc-base.service';
import {PlayersService} from '@service/players.service';
import {PlatformLocation} from '@angular/common';
import {ClientType} from '@service/rtc/rtc.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {

  vm$: Observable<{ peerId: string, players: Player[], showHost: boolean, connections: string[] }>;

  constructor(private rtcSvc: RtcBaseService, private playersSvc: PlayersService, private platformLoc: PlatformLocation) {
    this.rtcSvc.setClientType(ClientType.Base);
  }

  ngOnInit() {
    this.vm$ = combineLatest([
      this.rtcSvc.peerId$,
      this.playersSvc.players$,
      this.rtcSvc.hostConnection$,
      this.rtcSvc.playerConnections$,
    ]).pipe(
      map(([
             peerId,
             players,
             hostConnection,
             connections,
           ]) => {
        const connectedPlayerIds = Object.keys(connections);
        return {
          peerId,
          players: players
            .filter(player => !connectedPlayerIds.includes(player.id)),
          showHost: !Boolean(hostConnection),
          connections: Object.keys(connections),
        };
      }),
    );
  }

  formatLink(type: 'host' | 'player', peerId: string, player?: Player) {
    let link = (this.platformLoc as any).location.origin;
    link += `/connect/${type}`;
    if (player) {
      link += `;playerId=${player.id};playerName=${player.name}`;
    }
    link += `/${peerId}`;
    return link;
  }

}
