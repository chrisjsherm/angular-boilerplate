import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2';
import { ScannerComponent } from './scanner.component';

describe('ScannerComponent', (): void => {
  let component: ScannerComponent;
  let fixture: ComponentFixture<ScannerComponent>;
  let scannerInitSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(
    waitForAsync((): void => {
      TestBed.configureTestingModule({
        declarations: [ScannerComponent],
      }).compileComponents();
    }),
  );

  beforeEach((): void => {
    scannerInitSpy = Quagga.init = jasmine.createSpy();

    fixture = TestBed.createComponent(ScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should emit the user media not supported event when there is not navigator', (): void => {
    // Arrange
    const document = TestBed.inject(DOCUMENT);
    spyOnProperty(document.defaultView, 'navigator').and.returnValue(null);
    const mediaNotSupportedSpy = spyOn(
      component.getUserMediaNotSupported,
      'emit',
    );

    // Act
    component.ngAfterViewInit();

    // Assert
    expect(mediaNotSupportedSpy).toHaveBeenCalledTimes(1);
    expect(mediaNotSupportedSpy).toHaveBeenCalledWith(true);
  });

  it('should ask Quagga to initialize', (): void => {
    // Assert
    expect(scannerInitSpy).toHaveBeenCalledTimes(1);
  });

  describe('Quagga initialization callback', (): void => {
    it('should indicate there was a scanner initialization error', (): void => {
      // Arrange
      const initializationErrorSpy = spyOn(
        component.scannerInitializationError,
        'emit',
      );

      // Act
      component['quaggaInitializationCallback'](
        new Error('Initialization error'),
      );

      // Assert
      expect(initializationErrorSpy).toHaveBeenCalledTimes(1);
      expect(initializationErrorSpy).toHaveBeenCalledWith(
        new Error('Initialization error'),
      );
    });

    it(
      "should call 'start' on the Quagga library and register the " +
        "'onDetected' callback",
      (): void => {
        // Arrange
        const startSpy = (Quagga.start = jasmine.createSpy());
        const onDetectedSpy = (Quagga.onDetected = jasmine.createSpy());

        // Act
        component['quaggaInitializationCallback'](undefined);

        // Assert
        expect(startSpy).toHaveBeenCalledTimes(1);
        expect(onDetectedSpy).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('should indicate a barcode was detected and emit the result', (): void => {
    // Arrange
    const barcodeDetectedSpy = spyOn(component.barcodeDetected, 'emit');

    // Act
    component['quaggaOnDetectedCallback']({
      codeResult: {
        code: 'abc',
      },
    } as QuaggaJSResultObject);

    // Assert
    expect(barcodeDetectedSpy).toHaveBeenCalledTimes(1);
    expect(barcodeDetectedSpy).toHaveBeenCalledWith({
      codeResult: {
        code: 'abc',
      },
    } as QuaggaJSResultObject);
  });
});
