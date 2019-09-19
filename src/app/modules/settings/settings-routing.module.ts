import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from '@module/settings/overview/overview.component';
import {TeamsComponent} from '@module/settings/teams/teams.component';
import {EntriesComponent} from '@module/settings/entries/entries.component';


const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'entries', component: EntriesComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
}
