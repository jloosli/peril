import {Component, OnInit} from '@angular/core';
import {ClientType, RtcService} from '@service/rtc/rtc.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {PlatformLocation} from '@angular/common';
import {PlayersService} from '@service/players.service';
import {Player} from '@interface/player';

@Component({
  selector: 'app-game-connect',
  templateUrl: './game-connect.component.html',
  styleUrls: ['./game-connect.component.scss'],
})
export class GameConnectComponent implements OnInit {

  vm$: Observable<{ peerId: string, players: Player[], showHost: boolean }>;

  constructor(private rtcSvc: RtcService, private playersSvc: PlayersService, private location: PlatformLocation) {
    this.rtcSvc.setClientType(ClientType.Base);
    console.log(location.location.origin);
  }

  ngOnInit() {
    this.vm$ = combineLatest([this.rtcSvc.peerId$, this.rtcSvc.gameHost, this.playersSvc.players$]).pipe(
      map(([peerId, players]) => ({peerId, players})),
    );
  }

  formatLink(type: 'host' | 'player', peerId) {
    let link = this.location.location.origin;
    link += '/' + type;
    link += '?code=' + peerId;
    return link;
  }

}
