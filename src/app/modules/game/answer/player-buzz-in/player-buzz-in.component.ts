import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject} from '@angular/core';
import {Player} from '@interface/player';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-player-buzz-in',
  templateUrl: './player-buzz-in.component.html',
  styleUrls: ['./player-buzz-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBuzzInComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<PlayerBuzzInComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public player: Player) {
  }

  ngOnInit() {
  }

  result(res: boolean) {
    console.log(`Answered ${res ? '' : 'in'}correctly`);
    this.bottomSheetRef.dismiss(res);
  }

}
