import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from '@module/settings/overview/overview.component';
import {PlayersComponent} from '@module/settings/players/players.component';
import {EntriesComponent} from '@module/settings/entries/entries.component';


const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'entries', component: EntriesComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
}
