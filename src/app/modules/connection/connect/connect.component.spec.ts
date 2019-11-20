import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConnectComponent} from './connect.component';
import {RtcClientService} from '@service/rtc/rtc-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub} from '@testing/activated-route-stub';
import {ClientType} from '@service/rtc/rtc.service';
import {of} from 'rxjs';

const rtcClientServiceStub: Partial<RtcClientService> = {
  setClientType: jest.fn(),
  baseConnection$: of()
};

const RouterStub: Partial<RtcClientService> = {};

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectComponent],
      providers: [
        {provide: RtcClientService, useValue: rtcClientServiceStub},
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub({type: ClientType.Player, code: 'abc', playerId: 'def'})},
        {provide: Router, useValue: RouterStub},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
