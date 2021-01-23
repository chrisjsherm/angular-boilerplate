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
  scannerNotSupported: boolean;
  hasInitializationError: boolean;

  constructor() {}

  /**
   * Handle barcode detection events emitted from the scanner component
   *
   * @param barcodeResult Barcode data
   */
  onBarcodeDetected(barcodeResult: QuaggaJSResultObject): void {
    this.barcode = barcodeResult.codeResult.code;
  }

  /**
   * Set the property to indicate when the device does not support scanning
   * a barcode
   *
   * @param getUserMediaNoteSupported Indicates whether the device's
   *   `navigator.mediaDevices.getUserMedia` function exists
   */
  onGetUserMediaNotSupported(getUserMediaNoteSupported: boolean): void {
    console.error(
      'navigator.mediaDevices.getUserMedia does not exist on this device.',
    );
    this.scannerNotSupported = getUserMediaNoteSupported;
  }

  /**
   * Set the property to indicate when the barcode library encounters an error
   * while trying to initialize
   *
   * @param error Error provided by the Quagga library while attempting to initialize
   */
  onScannerInitializationError(error: Error): void {
    console.error('An error occurred initializing the scanner:', error.message);
    this.hasInitializationError = true;
  }
}
