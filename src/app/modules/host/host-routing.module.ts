import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HostComponent} from '@module/host/host/host.component';


const routes: Routes = [
  {path: '', component: HostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostRoutingModule {
}
