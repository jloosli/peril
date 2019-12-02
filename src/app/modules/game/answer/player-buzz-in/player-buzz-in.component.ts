import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Player} from '@interface/player';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-player-buzz-in',
  templateUrl: './player-buzz-in.component.html',
  styleUrls: ['./player-buzz-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBuzzInComponent implements AfterViewInit {

  answered = false;
  answerMessage: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<PlayerBuzzInComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public player: Player,
              private cdr: ChangeDetectorRef) {
    this.bottomSheetRef.afterOpened().pipe(
      tap(() => console.log('opened')),
      delay(5),
    ).subscribe(() => this.cdr.detectChanges());
    this.bottomSheetRef.afterDismissed().pipe(
    ).subscribe(() => this.cdr.detectChanges());
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  answer(res: boolean) {
    this.answered = true;
    this.answerMessage = `Answered ${res ? '' : 'in'}correctly`;
    setTimeout(() => this.cdr.detectChanges(), 1);
    console.log(this.answerMessage);
    this.bottomSheetRef.dismiss(res);
    setTimeout(() => this.cdr.detectChanges(), 1);
    console.log('Dismissed bottom sheet');

  }

}
