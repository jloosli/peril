import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {BoardComponent} from './board/board.component';
import {AnswerComponent} from './answer/answer.component';
import {QuestionComponent} from './question/question.component';
import {MaterialDesignModule} from '@module/material-design.module';
import {ScoreComponent} from './score/score.component';
import {GridComponent} from './grid/grid.component';
import {QrModule} from '@module/shared/qr/qr.module';
import {GameComponent} from './game/game.component';
import {PlayersComponent} from '@module/game/players/players.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ConnectComponent} from '@module/game/connect/connect.component';
import {PlayerBuzzInComponent} from './answer/player-buzz-in/player-buzz-in.component';
import {PlayerConnectComponent} from './connect/player-connect/player-connect.component';
import {QuestionSetComponent} from './question-set/question-set.component';
import {UploadComponent} from './question-set/upload/upload.component';
import {DownloadComponent} from './question-set/download/download.component';
import {EditComponent} from './question-set/edit/edit.component';


@NgModule({
  declarations: [BoardComponent, AnswerComponent, QuestionComponent, ScoreComponent, GridComponent, GameComponent, PlayersComponent,
    ConnectComponent,
    PlayerBuzzInComponent,
    PlayerConnectComponent,
    QuestionSetComponent,
    UploadComponent,
    DownloadComponent,
    EditComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    QrModule,
    ReactiveFormsModule,
    GameRoutingModule,
  ],
})
export class GameModule {
}
