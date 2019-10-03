import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {MaterialDesignModule} from '@module/material-design.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {
}
