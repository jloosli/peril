import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Player} from '@interface/player';
import {PlatformLocation} from '@angular/common';
import {ClientType} from '@service/rtc/rtc.service';

@Component({
  selector: 'app-player-connect',
  templateUrl: './player-connect.component.html',
  styleUrls: ['./player-connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerConnectComponent implements OnInit {

  @Input() peerId: string;
  @Input() player: Player;
  @Input() clientType: ClientType;
  @Input() showButton: false;

  constructor(private platformLoc: PlatformLocation) {
  }

  get clientConnectLink(): string {
    let link = (this.platformLoc as any).location.origin;
    link += `/${this.clientType};gameId=${this.peerId};clientType=${this.clientType}`;
    if (this.player) {
      link += `;playerId=${this.player.id};playerName=${this.player.name}`;
    }
    return link;
  }

  ngOnInit() {
  }

}
