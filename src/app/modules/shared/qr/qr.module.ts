import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QrComponent} from '@module/shared/qr/qr.component';
import {QrDirective} from './qr.directive';


@NgModule({
  declarations: [QrComponent, QrDirective],
  imports: [
    CommonModule,
  ],
  exports: [
    QrComponent,
    QrDirective,
  ],
})
export class QrModule {
}
