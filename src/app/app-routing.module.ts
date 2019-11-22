import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnectedToGameService} from '@service/guards/connected-to-game.service';


const routes: Routes = [
  {path: 'game', loadChildren: () => import('./modules/game/game.module').then(mod => mod.GameModule)},
  {path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(mod => mod.SettingsModule)},
  {
    path: 'host',
    loadChildren: () => import('./modules/host/host.module').then(mod => mod.HostModule),
    canActivate: [ConnectedToGameService],
  },
  {
    path: 'player',
    loadChildren: () => import('./modules/team/team.module').then(mod => mod.TeamModule),
    canActivate: [ConnectedToGameService],
  },
  // {path: 'connect', loadChildren: () => import('./modules/connection/connection.module').then(mod => mod.ConnectionModule)},
  {path: '', loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
