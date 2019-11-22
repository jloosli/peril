import {TestBed} from '@angular/core/testing';

import {RtcClientService} from './rtc-client.service';

describe('RtcClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtcClientService = TestBed.inject(RtcClientService);
    expect(service).toBeTruthy();
  });
});
