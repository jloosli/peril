import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitingHostComponent} from './waiting-host.component';

describe('WaitingHostComponent', () => {
  let component: WaitingHostComponent;
  let fixture: ComponentFixture<WaitingHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingHostComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
