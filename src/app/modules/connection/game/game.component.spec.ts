import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameComponent} from './game.component';
import {Component, Input} from '@angular/core';
import {RtcBaseService} from '@service/rtc/rtc-base.service';
import {PlayersService} from '@service/players.service';
import {PlatformLocation} from '@angular/common';
import {of} from 'rxjs';

@Component({selector: 'app-qr', template: ''})
export class AppQrStubComponent {
  @Input() size;
  @Input() value;
}

const RtcBaseServiceStub: Partial<RtcBaseService> = {
  setClientType: jest.fn(),
  hostConnection$: of(undefined),
  playerConnections$: of([]),
  id$: of('id'),
};
const PlayersServiceStub: Partial<PlayersService> = {
  players$: of([]),
};
const PlatformLocationStub = {
  location: {
    origin: '',
  },
};

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, AppQrStubComponent],
      providers: [
        {provide: RtcBaseService, useValue: RtcBaseServiceStub},
        {provide: PlayersService, useValue: PlayersServiceStub},
        {provide: PlatformLocation, useValue: PlatformLocationStub},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
