import {Injectable} from '@angular/core';
import {Player} from '@interface/player';
import {map, shareReplay, switchMap, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DbService} from '@service/db.service';
import * as uuidv4 from 'uuid/v4';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {

  static PLAYERS_KEY = 'players';
  players$: Observable<Player[]>;

  constructor(private dbSvc: DbService) {
    this.players$ = dbSvc.obsKey(PlayersService.PLAYERS_KEY).pipe(
      map(players => players ? players : []),
      shareReplay({bufferSize: 1, refCount: true}),
    );
  }

  private static initializePlayer(player: Partial<Player>): Player {
    const cleanPlayer = {...player};
    cleanPlayer.id = cleanPlayer.id || uuidv4();
    cleanPlayer.score = cleanPlayer.score || 0;
    return cleanPlayer as Player;
  }

  addPlayer(rawPlayer: Partial<Player>): Promise<Player[]> {
    const player = PlayersService.initializePlayer(rawPlayer);
    player.id = uuidv4();
    player.score = player.score || 0;
    return this.players$.pipe(
      take(1),
      map(players => ([...players, player]) as Player[]),
      switchMap(newPlayers => this.dbSvc.setItem<Player[]>(PlayersService.PLAYERS_KEY, newPlayers)),
    ).toPromise();
  }

  async setPlayers(players: Partial<Player>[]): Promise<Player[]> {
    await this.clearPlayers();
    return this.dbSvc.setItem<Player[]>(PlayersService.PLAYERS_KEY, players.map(PlayersService.initializePlayer));
  }

  removePlayer(id: string): Promise<void> {
    return this.players$.pipe(
      map(players => {
        const idx = players.findIndex(player => player.id === id);
        if (idx === -1) {
          throw new Error('Invalid Player ID');
        }
        players.splice(idx, 1);
        return players;
      }),
      switchMap(players => this.dbSvc.setItem<Player[]>(PlayersService.PLAYERS_KEY, players)),
      map(() => undefined),
    ).toPromise();
  }

  changeScore(id: string, amount: number): Promise<void> {
    return this.players$.pipe(
      map(players => {
        const idx = players.findIndex((player) => player.id === id);
        if (idx === -1) {
          throw new Error('Invalid Player');
        }
        players[idx].score += amount;
        this.dbSvc.setItem<Player[]>(PlayersService.PLAYERS_KEY, players);
      }),
    ).toPromise();
  }

  clearPlayers() {
    return this.dbSvc.setItem<Player[]>(PlayersService.PLAYERS_KEY, []);
  }

}
