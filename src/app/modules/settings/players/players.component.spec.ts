import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayersComponent} from './players.component';
import {MaterialDesignModule} from '@module/material-design.module';
import {ReactiveFormsModule} from '@angular/forms';

describe('TeamsComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersComponent],
      imports: [MaterialDesignModule, ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
