import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { MockComponents } from 'ng-mocks';
import { ScannerComponent } from '../../organisms/scanner/scanner.component';
import { ScanPageComponent } from './scan-page.component';

describe('ScanPageComponent', (): void => {
  let component: ScanPageComponent;
  let fixture: ComponentFixture<ScanPageComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [
          ScanPageComponent,
          MockComponents(ScannerComponent, MatSpinner),
        ],
      }).compileComponents();
    },
  );

  beforeEach((): void => {
    fixture = TestBed.createComponent(ScanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should display "initializing scanner" until the scanner initializes', (): void => {
    // Arrange
    const barcodeResults: HTMLElement = fixture.debugElement.query(By.css('p'))
      .nativeElement;

    // Assert
    expect(barcodeResults.innerText).toContain('Initializing scanner');
  });

  it('should display instructions for scanning once the scanner initializes', (): void => {
    // Arrange
    const barcodeResults: HTMLElement = fixture.debugElement.query(By.css('p'))
      .nativeElement;

    // Act
    component.onIsScannerInitialized(true);
    fixture.detectChanges();

    // Assert
    expect(barcodeResults.innerText).toBe(
      'Scan the barcode by placing it in the middle of the view finder.',
    );
  });

  it('should display the barcode when one is detected', (): void => {
    // Arrange
    const barcodeResults: HTMLElement = fixture.debugElement.query(By.css('p'))
      .nativeElement;

    // Act
    component.onIsScannerInitialized(true);
    component.onBarcodeDetected({
      codeResult: {
        code: 'abc',
      },
    } as QuaggaJSResultObject);
    fixture.detectChanges();

    // Assert
    expect(barcodeResults.innerText).toBe('Barcode detected: abc');
  });

  it('should set the scanner not supported property', (): void => {
    // Assert
    expect(component.scannerNotSupported).toBeUndefined();

    // Act
    component.onGetUserMediaNotSupported(true);

    // Assert
    expect(component.scannerNotSupported).toBe(true);
  });

  it('should set the scanner initialization error message property', (): void => {
    // Arrange
    const error = new Error(
      'Error encountered while initializing barcode library',
    );

    // Act
    component.onScannerInitializationError(error);

    // Assert
    expect(component.hasInitializationError).toBe(true);
  });
});
