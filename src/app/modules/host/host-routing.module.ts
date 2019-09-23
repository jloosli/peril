import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnectHostComponent} from '@module/host/connect-host/connect-host.component';


const routes: Routes = [
  {path: '', component: ConnectHostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostRoutingModule {
}
