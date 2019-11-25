import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RtcClientService} from '@service/rtc/rtc-client.service';
import {ClientType, EventType} from '@service/rtc/rtc.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-team',
  template: '<app-buzzer [name]="playerName" [active]="active" (buzzed)="onBuzz()"></app-buzzer>',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {

  gameId: string;
  playerId: string;
  playerName: string;
  active = true;

  constructor(private clientSvc: RtcClientService, private route: ActivatedRoute, private location: Location) {
    this.route.paramMap.subscribe((paramMap) => {
      this.clientSvc.setClientType(ClientType.Player);
      this.gameId = paramMap.get('gameId');
      this.playerId = paramMap.get('playerId') || undefined;
      this.playerName = paramMap.get('playerName') || undefined;
      this.clientSvc.connect(this.gameId, this.playerId);
    });

  }

  ngOnInit() {
    this.clientSvc.data$.subscribe(x => console.log(x));
  }

  onBuzz() {
    console.log('buzzed in');
    this.clientSvc.send({eventType: EventType.Buzz});
  }

}
