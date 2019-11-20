import {TestBed} from '@angular/core/testing';

import {RtcBaseService} from './rtc-base.service';
import Peer from 'peerjs';
import {PEER_SERVICE} from '@service/rtc/rtc.service';
import {of} from 'rxjs';
import {PlayersService} from '@service/players.service';

const playersServiceStub = {
  players$: of([]),
};

describe('RtcBaseService', () => {
  let peerStub: Partial<Peer>;
  beforeEach(() => {
    peerStub = {
      on: jest.fn(),
    };
  });
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: PEER_SERVICE, useValue: peerStub},
      {provide: PlayersService, useValue: playersServiceStub},
    ],
  }));

  it('should be created', () => {
    const service: RtcBaseService = TestBed.get(RtcBaseService);
    expect(service).toBeTruthy();
  });
});
