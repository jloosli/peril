import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WaitingComponent} from './waiting.component';
import {RtcClientService} from '@service/rtc/rtc-client.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

describe('WaitingComponent', () => {
  let component: WaitingComponent;
  let fixture: ComponentFixture<WaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingComponent],
      providers: [
        {provide: RtcClientService, useValue: {data$: of(), myType$: of()}},
      ],
      imports: [RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
