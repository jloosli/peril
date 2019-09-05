import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Player} from '@interface/player';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {

  players$ = new BehaviorSubject([
    {name: 'Player 1', score: 0},
    {name: 'Player 2', score: 0},
  ]);

  constructor() {
  }

  changeScore(player: Player, amount: number): Promise<boolean> {
    return this.players$.pipe(
      map(players => {
        const idx = players.indexOf(player);
        if (idx === -1) {
          throw new Error('Invalid Player');
        }
        players[idx].score += amount;
        this.players$.next(players);
        return true;
      }),
    ).toPromise();
  }
}
