import {Component, OnInit} from '@angular/core';
import {ClientType, RtcService} from '@service/rtc.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game-connect',
  templateUrl: './game-connect.component.html',
  styleUrls: ['./game-connect.component.scss'],
})
export class GameConnectComponent implements OnInit {

  vm$: Observable<{ peerId: string }>;

  constructor(private rtcSvc: RtcService) {
    this.rtcSvc.myType = ClientType.Main;
  }

  ngOnInit() {
    this.vm$ = combineLatest([this.rtcSvc.peerId$]).pipe(
      map(([peerId]) => ({peerId})),
    );
  }

}
