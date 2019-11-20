import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Player} from '@interface/player';
import {RtcBaseService} from '@service/rtc/rtc-base.service';
import {PlayersService} from '@service/players.service';
import {PlatformLocation} from '@angular/common';
import {ClientType} from '@service/rtc/rtc.service';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

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
      this.playersSvc.players$.pipe(tap(x => console.log(x))),
      this.rtcSvc.hostConnection$.pipe(tap(x => console.log(x))),
      this.rtcSvc.playerConnections$.pipe(tap(x => console.log(x))),
      this.rtcSvc.id$.pipe(tap(x => console.log(x))),
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
          showHost: !Boolean(hostConnection),
          connections: connectedPlayerIds,
        };
      }),
    );
  }

  formatLink(type: 'host' | 'player', peerId: string, player?: Player) {
    let link = (this.platformLoc as any).location.origin;
    link += `/connect/${type}/${peerId}`;
    if (player) {
      link += `;playerId=${player.id};playerName=${player.name}`;
    }
    return link;
  }

}
