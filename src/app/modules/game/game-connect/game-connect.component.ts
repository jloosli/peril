import {Component, OnInit} from '@angular/core';
import {RtcService} from '@service/rtc.service';

@Component({
  selector: 'app-game-connect',
  templateUrl: './game-connect.component.html',
  styleUrls: ['./game-connect.component.scss'],
})
export class GameConnectComponent implements OnInit {

  constructor(private rtcSvc: RtcService) {
  }

  ngOnInit() {
  }

}
