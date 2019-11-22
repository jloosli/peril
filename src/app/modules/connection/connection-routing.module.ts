import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnectComponent} from '@module/connection/connect/connect.component';
import {WaitingComponent} from '@module/connection/waiting/waiting.component';


const routes: Routes = [
  {path: 'waiting', component: WaitingComponent},
  {path: ':type/:code', component: ConnectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionRoutingModule {
}
