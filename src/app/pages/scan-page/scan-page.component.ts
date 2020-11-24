import { Component } from '@angular/core';
import { QuaggaJSResultObject } from '@ericblade/quagga2';

/**
 * Page containing the Quagga barcode scanner. Displays information based on
 * barcode scans.
 */
@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.scss'],
})
export class ScanPageComponent {
  barcode: string;

  constructor() {}

  /**
   * Handle barcode detection events emitted from the scanner component
   *
   * @param barcodeResult Barcode data
   */
  onBarcodeDetected(barcodeResult: QuaggaJSResultObject): void {
    this.barcode = barcodeResult.codeResult.code;
  }
}
