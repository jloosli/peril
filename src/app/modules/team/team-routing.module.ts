import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuzzerComponent} from '@module/team/buzzer/buzzer.component';
import {TeamComponent} from '@module/team/team/team.component';


const routes: Routes = [
  {
    path: '', component: TeamComponent, children: [
      {path: '', component: BuzzerComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {
}
