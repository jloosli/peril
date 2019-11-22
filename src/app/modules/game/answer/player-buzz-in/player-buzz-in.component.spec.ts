import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBuzzInComponent } from './player-buzz-in.component';

describe('PlayerBuzzInComponent', () => {
  let component: PlayerBuzzInComponent;
  let fixture: ComponentFixture<PlayerBuzzInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBuzzInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBuzzInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
