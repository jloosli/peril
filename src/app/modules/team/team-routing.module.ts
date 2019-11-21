import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuzzerComponent} from '@module/team/buzzer/buzzer.component';


const routes: Routes = [
  {path: '', component: BuzzerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {
}
