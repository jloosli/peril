import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RtcPlayerService} from '@service/rtc/rtc-player.service';
import {ClientType} from '@service/rtc/rtc.service';
import {filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-connect-team',
  templateUrl: './connect-team.component.html',
  styleUrls: ['./connect-team.component.scss'],
})
export class ConnectTeamComponent implements OnInit {

  teamForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });
  vm$: Observable<{ playerId: string, playerName: string }>;

  constructor(private rtcSvc: RtcPlayerService, private route: ActivatedRoute) {
    this.rtcSvc.setClientType(ClientType.Player);
  }

  ngOnInit() {
    this.vm$ = this.route.queryParamMap.pipe(
      filter((params: ParamMap) => ['code', 'playerId', 'playerName'].every(key => params.has(key))),
      tap((params: ParamMap) => this.teamForm.get('code').setValue(params.get('code'))),
      map((params: ParamMap) => ({playerId: params.get('playerId'), playerName: params.get('playerName')})),
    );
  }

  submitCode(playerId: string) {
    this.rtcSvc.connect(this.teamForm.get('code').value, ClientType.Player, playerId);
  }

}
