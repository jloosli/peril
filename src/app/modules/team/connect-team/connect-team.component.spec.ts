import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConnectTeamComponent} from './connect-team.component';

describe('ConnectTeamComponent', () => {
  let component: ConnectTeamComponent;
  let fixture: ComponentFixture<ConnectTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectTeamComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
