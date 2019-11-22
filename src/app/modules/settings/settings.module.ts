import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {OverviewComponent} from './overview/overview.component';
import {EntriesComponent} from './entries/entries.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialDesignModule} from '@module/material-design.module';


@NgModule({
  declarations: [OverviewComponent, EntriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {
}
