import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WaitingHostComponent} from '@module/host/waiting-host/waiting-host.component';


const routes: Routes = [
  {path: 'waiting', component: WaitingHostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostRoutingModule {
}
