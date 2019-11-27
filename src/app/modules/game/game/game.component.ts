import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RtcBaseService} from '@service/rtc/rtc-base.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {

  constructor(private rtcBase: RtcBaseService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // // @todo: This should probably be moved to a resolver
    // this.activatedRoute.paramMap.pipe(
    //   filter(paramMap => paramMap.has('gameId')),
    //   map(paramMap => paramMap.get('gameId')),
    //   distinctUntilChanged()
    // ).subscribe((id) => {
    //   this.rtcBase.setPeerId(id);
    // });
  }

}
