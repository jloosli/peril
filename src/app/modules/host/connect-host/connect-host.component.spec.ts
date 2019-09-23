import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConnectHostComponent} from './connect-host.component';

describe('ConnectHostComponent', () => {
  let component: ConnectHostComponent;
  let fixture: ComponentFixture<ConnectHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectHostComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
