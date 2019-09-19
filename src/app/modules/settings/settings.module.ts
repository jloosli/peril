import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {TeamsComponent} from './teams/teams.component';
import {OverviewComponent} from './overview/overview.component';
import {EntriesComponent} from './entries/entries.component';


@NgModule({
  declarations: [TeamsComponent, OverviewComponent, EntriesComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {
}
