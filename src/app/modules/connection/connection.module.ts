import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectComponent} from './connect/connect.component';
import {WaitingComponent} from './waiting/waiting.component';
import {GameComponent} from './game/game.component';
import {ConnectionRoutingModule} from '@module/connection/connection-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialDesignModule} from '@module/material-design.module';
import {QrModule} from '@module/shared/qr/qr.module';


@NgModule({
  declarations: [ConnectComponent, WaitingComponent, GameComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    QrModule,
    ConnectionRoutingModule,
  ],
})
export class ConnectionModule {
}
