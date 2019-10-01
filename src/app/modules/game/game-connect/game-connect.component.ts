import {Component, OnInit} from '@angular/core';
import {ClientType} from '@service/rtc/rtc.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {PlatformLocation} from '@angular/common';
import {PlayersService} from '@service/players.service';
import {Player} from '@interface/player';
import {RtcBaseService} from '@service/rtc/rtc-base.service';

@Component({
  selector: 'app-game-connect',
  templateUrl: './game-connect.component.html',
  styleUrls: ['./game-connect.component.scss'],
})
export class GameConnectComponent implements OnInit {

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
    link += `/${type}/connect?code=${peerId}`;
    if (player) {
      link += `&playerId=${player.id}&playerName=${player.name}`;
    }
    return link;
  }
}
