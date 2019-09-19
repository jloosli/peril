import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {BoardComponent} from './board/board.component';
import {AnswerComponent} from './answer/answer.component';
import {QuestionComponent} from './question/question.component';
import {MaterialDesignModule} from '@module/material-design.module';
import {ScoreComponent} from './score/score.component';
import {GridComponent} from './grid/grid.component';
import {StartComponent} from './start/start.component';


@NgModule({
  declarations: [BoardComponent, AnswerComponent, QuestionComponent, ScoreComponent, GridComponent, StartComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    GameRoutingModule,
  ],
})
export class GameModule {
}
