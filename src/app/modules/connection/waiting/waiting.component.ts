import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RtcClientService} from '@service/rtc/rtc-client.service';
import {filter, take} from 'rxjs/operators';
import {ClientType, EventType} from '@service/rtc/rtc.service';
import {combineLatest} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingComponent {

  constructor(private rtcSvc: RtcClientService, private router: Router) {
    combineLatest([this.rtcSvc.data$, this.rtcSvc.myType$]).pipe(
      filter(([msg]) => msg.eventType === EventType.Init),
      take(1),
    ).subscribe(([msg, type]) => {
      this.router.navigate([type === ClientType.GameHost ? '/host' : '/player']);
    });
  }


}
