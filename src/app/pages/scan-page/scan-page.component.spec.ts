import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { MockComponents } from 'ng-mocks';
import { NGXLogger } from 'ngx-logger';
import { NGXLoggerMock } from 'ngx-logger/testing';
import { ScannerComponent } from '../../organisms/scanner/scanner.component';
import { ScanPageComponent } from './scan-page.component';

describe('ScanPageComponent', (): void => {
  let component: ScanPageComponent;
  let fixture: ComponentFixture<ScanPageComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        providers: [
          {
            provide: NGXLogger,
            useClass: NGXLoggerMock,
          },
        ],
        declarations: [ScanPageComponent, MockComponents(ScannerComponent)],
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

  it('should set the barcode property when it detects a barcode', (): void => {
    // Act
    component.onBarcodeDetected({
      codeResult: {
        code: 'abc',
      },
    } as QuaggaJSResultObject);
    fixture.detectChanges();

    // Arrange
    const barcodeElement: HTMLElement = fixture.debugElement.query(By.css('p'))
      .nativeElement;

    // Assert
    expect(barcodeElement.innerText).toBe('abc');
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
