import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardComponent} from '@module/game/board/board.component';
import {AnswerComponent} from '@module/game/answer/answer.component';
import {QuestionComponent} from '@module/game/question/question.component';
import {GameConnectComponent} from '@module/game/game-connect/game-connect.component';


const routes: Routes = [
  {
    path: '', component: BoardComponent,
  },
  {path: 'connect', component: GameConnectComponent},
  {
    path: ':category/:idx', children: [
      {path: '', component: AnswerComponent},
      {path: 'question', component: QuestionComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {
}
