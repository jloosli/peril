import {TestBed} from '@angular/core/testing';
import Peer from 'peerjs';
import {ClientType, PEER_SERVICE_WITH_ID, RtcService} from './rtc.service';
import Mock = jest.Mock;
import DoneCallback = jest.DoneCallback;


describe('RtcService', () => {
  let peerStub: Partial<Peer>;
  beforeEach(() => {
    peerStub = {
      on: jest.fn(),
    };
  });
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: PEER_SERVICE_WITH_ID, useValue: peerStub},
    ],
  }));

  it('should be created', () => {
    const service: RtcService = TestBed.inject(RtcService);
    expect(service).toBeTruthy();
  });

  it('should call on 5 times', () => {
    const service: RtcService = TestBed.inject(RtcService);
    expect((peerStub.on as Mock).mock.calls.length).toBe(5);
  });

  it('should emit the correct client type', (done: DoneCallback) => {
    const service: RtcService = TestBed.inject(RtcService);
    service.myType$.subscribe(type => {
      expect(type).toBe(ClientType.GameHost);
      done();
    });
    service.setClientType(ClientType.GameHost);
  });
});
