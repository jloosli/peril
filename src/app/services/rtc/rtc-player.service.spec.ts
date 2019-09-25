import {TestBed} from '@angular/core/testing';

import {RtcPlayerService} from './rtc-player.service';

describe('RtcPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtcPlayerService = TestBed.get(RtcPlayerService);
    expect(service).toBeTruthy();
  });
});
