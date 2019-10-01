import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnectTeamComponent} from '@module/team/connect-team/connect-team.component';


const routes: Routes = [
  {path: 'connect', component: ConnectTeamComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {
}
