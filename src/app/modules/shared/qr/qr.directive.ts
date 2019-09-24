import {Directive, Input, OnChanges, SimpleChanges, ViewContainerRef} from '@angular/core';
import QRCode from 'qrcode';
import {QrCodeErrorCorrectionLevel} from '@module/shared/qr/qrcode-error-correction-level';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'canvas[qrCode]',
})
export class QrDirective implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('qrCode') value!: string;
// tslint:disable-next-line:no-input-rename
  @Input('qrCodeVersion') version?: number;

  // tslint:disable-next-line:no-input-rename
  @Input('qrCodeErrorCorrectionLevel') errorCorrectionLevel: QrCodeErrorCorrectionLevel = 'M';

  @Input() width?: number;
  @Input() height?: number;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.value) {
      return;
    }

    if (this.version && this.version > 40) {
      console.warn('[qrCode] max version is 40, clamping');
      this.version = 40;
    } else if (this.version && this.version < 1) {
      console.warn('[qrCode] min version is 1, clamping');
      this.version = 1;
    } else if (this.version !== undefined && isNaN(this.version)) {
      console.warn('[qrCode] version should be set to a number, defaulting to auto');
      this.version = undefined;
    }

    const canvas = this.viewContainerRef.element.nativeElement as HTMLCanvasElement | null;

    if (!canvas) {
      // native element not available on server side rendering
      return;
    }

    const context = canvas.getContext('2d');

    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    // tslint:disable-next-line:no-floating-promises
    QRCode.toCanvas(canvas, this.value, {
      version: this.version,
      errorCorrectionLevel: this.errorCorrectionLevel,
      width: this.width,
      height: this.height,
    });
  }

}
