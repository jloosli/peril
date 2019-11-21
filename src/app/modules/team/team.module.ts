import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamRoutingModule} from './team-routing.module';
import {BuzzerComponent} from './buzzer/buzzer.component';
import {WagerComponent} from './wager/wager.component';
import {QuestionComponent} from './question/question.component';
import {MaterialDesignModule} from '@module/material-design.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [BuzzerComponent, WagerComponent, QuestionComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    TeamRoutingModule,
  ],
})
export class TeamModule {
}
