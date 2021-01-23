import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2';
import { scannerConfiguration } from './scanner.configuration';

/**
 * Quagga barcode scanner. Emits barcode readings as well as errors resulting
 * from failure to initialize the scanner
 */
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements AfterViewInit {
  @Output() barcodeDetected = new EventEmitter<QuaggaJSResultObject>();
  @Output() getUserMediaNotSupported = new EventEmitter<boolean>();
  @Output() scannerInitializationError = new EventEmitter<Error>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Callback method that is invoked immediately after Angular has completed
   * initialization of a component's view. It is invoked only once when the
   * view is instantiated.
   */
  ngAfterViewInit(): void {
    if (
      this.document.defaultView.navigator &&
      typeof this.document.defaultView.navigator.mediaDevices.getUserMedia ===
        'function'
    ) {
      Quagga.init(scannerConfiguration, this.quaggaInitializationCallback);
    } else {
      this.getUserMediaNotSupported.emit(true);
    }
  }

  /**
   * Function for Quagga to call after attempting to initialize the library
   *
   * @param initializationError Error provided by the Quagga scanner library
   *   while trying to initialize
   */
  private quaggaInitializationCallback = (initializationError: Error): void => {
    if (initializationError) {
      this.scannerInitializationError.emit(initializationError);
    } else {
      Quagga.start();
      Quagga.onDetected(this.quaggaOnDetectedCallback);
    }
  };

  /**
   * Function for Quagga to call each time it detects a barcode
   *
   * @param result Barcode result read via the Quagga scanner library
   */
  private quaggaOnDetectedCallback(result: QuaggaJSResultObject): void {
    this.barcodeDetected.emit(result);
  }
}
