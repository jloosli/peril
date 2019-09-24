import {Component, Input} from '@angular/core';
import {QrCodeErrorCorrectionLevel} from '@module/shared/qr/qrcode-error-correction-level';

@Component({
  selector: 'app-qr',
  template: `
      <canvas *ngIf="value"
              [qrCode]="value"
              [qrCodeErrorCorrectionLevel]="errorCorrectionLevel"
              [width]="size" [height]="size"></canvas>`,
  styles: [],
})
export class QrComponent {

  @Input() size: string | number = 100;
  @Input() value?: string;
  @Input() errorCorrectionLevel?: QrCodeErrorCorrectionLevel;


  constructor() {
  }
}
