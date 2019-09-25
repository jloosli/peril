import {TestBed} from '@angular/core/testing';

import {RtcBaseService} from './rtc-base.service';

describe('RtcBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtcBaseService = TestBed.get(RtcBaseService);
    expect(service).toBeTruthy();
  });
});
