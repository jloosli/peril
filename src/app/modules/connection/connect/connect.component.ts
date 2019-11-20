import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClientType} from '@service/rtc/rtc.service';
import {filter, map, take, tap} from 'rxjs/operators';
import {RtcClientService} from '@service/rtc/rtc-client.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectComponent implements OnInit {
  vm$: Observable<{ type: ClientType, code: string, playerId?: string }>;

  codeForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor(private rtcSvc: RtcClientService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.vm$ = this.route.paramMap.pipe(
      map((params: ParamMap) => ({
        type: params.get('type') as ClientType,
        code: params.get('code'),
        playerId: params.get('playerId'),
      })),
      tap(vals => this.rtcSvc.setClientType(vals.type)),
    );
    this.vm$.subscribe(vals => {
      this.codeForm.get('code').setValue(vals.code);
      this.submitCode(vals.code, vals.playerId);
    });

    this.rtcSvc.baseConnection$.pipe(
      tap(x => console.log(x)),
      filter(Boolean),
      take(1),
    ).subscribe(() => {
      this.router.navigate(['../../waiting'], {relativeTo: this.route});
    });
  }

  submitCode(code: string, playerId?: string) {
    this.rtcSvc.connect(
      code,
      playerId);
  }

}
