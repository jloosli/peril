import { TestBed } from '@angular/core/testing';

import { ConnectedToGameService } from './connected-to-game.service';

describe('ConnectedToGameService', () => {
  let service: ConnectedToGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectedToGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
