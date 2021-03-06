import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardComponent} from '@module/game/board/board.component';
import {AnswerComponent} from '@module/game/answer/answer.component';
import {QuestionComponent} from '@module/game/question/question.component';
import {GameComponent} from '@module/game/game/game.component';
import {PlayersComponent} from '@module/game/players/players.component';
import {ConnectComponent} from '@module/game/connect/connect.component';
import {QuestionSetComponent} from '@module/game/question-set/question-set.component';


const routes: Routes = [
  {
    path: ':gameId', component: GameComponent, children: [
      {
        path: 'settings', children: [
          {path: 'players', component: PlayersComponent},
          {path: 'question-set', component: QuestionSetComponent},
          {path: '**', redirectTo: 'players'},
        ],
      },
      {path: 'connect', component: ConnectComponent},
      {
        path: '', component: BoardComponent,
      },
      {
        path: ':category/:idx/:amount', children: [
          {path: '', component: AnswerComponent},
          {path: 'question', component: QuestionComponent},
        ],
      },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {
}
