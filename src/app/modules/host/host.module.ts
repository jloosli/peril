import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HostRoutingModule} from './host-routing.module';
import {ConnectHostComponent} from './connect-host/connect-host.component';
import {MaterialDesignModule} from '@module/material-design.module';
import {ReactiveFormsModule} from '@angular/forms';
import {WaitingHostComponent} from './waiting-host/waiting-host.component';


@NgModule({
  declarations: [ConnectHostComponent, WaitingHostComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    HostRoutingModule,
  ],
})
export class HostModule {
}
