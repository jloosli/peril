import {QrDirective} from './qr.directive';

describe('QrDirective', () => {
  it('should create an instance', () => {
    const directive = new QrDirective({element: {nativeElement: {}}});
    expect(directive).toBeTruthy();
  });
});
