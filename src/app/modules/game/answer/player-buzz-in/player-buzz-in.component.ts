import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Player} from '@interface/player';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-player-buzz-in',
  templateUrl: './player-buzz-in.component.html',
  styleUrls: ['./player-buzz-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBuzzInComponent implements OnInit {

  answered = false;
  answerMessage: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<PlayerBuzzInComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public player: Player) {
  }

  ngOnInit() {
  }

  answer(res: boolean) {
    this.answered = true;
    this.answerMessage = `Answered ${res ? '' : 'in'}correctly`;
    console.log(this.answerMessage);
    this.bottomSheetRef.dismiss(res);
    console.log('Dismissed bottom sheet');
  }

}
