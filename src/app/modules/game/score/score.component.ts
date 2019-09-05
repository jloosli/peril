import {Component, OnInit} from '@angular/core';
import {PlayersService} from '@service/players.service';
import {combineLatest, Observable} from 'rxjs';
import {Player} from '@interface/player';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  vm$: Observable<{ teams: Player[] }>;

  constructor(private teamsSvc: PlayersService) {
    this.vm$ = combineLatest([this.teamsSvc.players$]).pipe(
      map(([teams]: [Player[]]) => ({teams})),
    );
  }

  ngOnInit() {
  }

}
