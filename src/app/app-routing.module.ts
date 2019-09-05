import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: 'game', loadChildren: () => import('./modules/game/game.module').then(mod => mod.GameModule)},
  {path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(mod => mod.SettingsModule)},
  {path: '', loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
