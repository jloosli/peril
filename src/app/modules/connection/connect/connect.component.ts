import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClientType} from '@service/rtc/rtc.service';
import {filter, map, take, tap} from 'rxjs/operators';
import {RtcClientService} from '@service/rtc/rtc-client.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectComponent implements OnInit {

  codeForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor(private rtcSvc: RtcClientService, private route: ActivatedRoute, private router: Router) {
    this.rtcSvc.setClientType(ClientType.GameHost);
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      tap(x => console.log(x)),
      filter((params: ParamMap) => params.has('code')),
      map((params: ParamMap) => params.get('code')),
    ).subscribe(code => {
      this.codeForm.get('code').setValue(code);
      this.submitCode();
    });

    this.rtcSvc.baseConnection$.pipe(
      tap(x => console.log(x)),
      filter(Boolean),
      take(1),
    ).subscribe(() => {
      this.router.navigate(['../waiting'], {relativeTo: this.route});
    });
  }

  submitCode() {
    this.rtcSvc.connect(this.codeForm.get('code').value, ClientType.GameHost);
  }

}
