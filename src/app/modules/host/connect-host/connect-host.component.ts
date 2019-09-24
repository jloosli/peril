import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientType, RtcService} from '@service/rtc.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-connect-host',
  templateUrl: './connect-host.component.html',
  styleUrls: ['./connect-host.component.scss'],
})
export class ConnectHostComponent implements OnInit {

  hostForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor(private rtcSvc: RtcService, private route: ActivatedRoute) {
    this.rtcSvc.myType = ClientType.Host;
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
    console.log(this.hostForm.value);
    console.log(this.hostForm.get('code').value);
    this.rtcSvc.join(this.hostForm.get('code').value, ClientType.Host);
  }

}
