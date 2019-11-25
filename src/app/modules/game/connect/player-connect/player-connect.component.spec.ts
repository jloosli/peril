import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerConnectComponent} from './player-connect.component';

describe('PlayerConnectComponent', () => {
  let component: PlayerConnectComponent;
  let fixture: ComponentFixture<PlayerConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerConnectComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
