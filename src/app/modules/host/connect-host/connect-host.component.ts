import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientType} from '@service/rtc/rtc.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {RtcGameHostService} from '@service/rtc/rtc-game-host.service';

@Component({
  selector: 'app-connect-host',
  templateUrl: './connect-host.component.html',
  styleUrls: ['./connect-host.component.scss'],
})
export class ConnectHostComponent implements OnInit {

  hostForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor(private rtcSvc: RtcGameHostService, private route: ActivatedRoute) {
    this.rtcSvc.setClientType(ClientType.GameHost);
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      filter((params: ParamMap) => params.has('code')),
      map((params: ParamMap) => params.get('code')),
    ).subscribe(code => {
      this.hostForm.get('code').setValue(code);
    });
  }

  submitCode() {
    this.rtcSvc.connect(this.hostForm.get('code').value, ClientType.GameHost);
  }

}
