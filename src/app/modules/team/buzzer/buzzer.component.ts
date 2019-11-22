import {Component, OnInit} from '@angular/core';
import {RtcClientService} from '@service/rtc/rtc-client.service';
import {EventType} from '@service/rtc/rtc.service';

@Component({
  selector: 'app-buzzer',
  templateUrl: './buzzer.component.html',
  styleUrls: ['./buzzer.component.scss'],
})
export class BuzzerComponent implements OnInit {

  constructor(private rtcClientSvc: RtcClientService) {
  }

  ngOnInit() {
    this.rtcClientSvc.data$.subscribe(x => console.log(x));
  }

  buzz() {
    console.log('buzzed in');
    this.rtcClientSvc.send({eventType: EventType.Buzz});
  }

}
