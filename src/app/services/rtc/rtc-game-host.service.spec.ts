import {TestBed} from '@angular/core/testing';

import {RtcGameHostService} from './rtc-game-host.service';

describe('RtcGameHostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtcGameHostService = TestBed.get(RtcGameHostService);
    expect(service).toBeTruthy();
  });
});
