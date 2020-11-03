import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';
import { SnackbarSuccessComponent } from './snackbar-success.component';

describe('SnackbarSuccessComponent', (): void => {
  let component: SnackbarSuccessComponent;
  let fixture: ComponentFixture<SnackbarSuccessComponent>;
  let snackbarRef: MatSnackBarRef<SnackbarSuccessComponent>;

  beforeEach(
    waitForAsync((): void => {
      TestBed.configureTestingModule({
        declarations: [SnackbarSuccessComponent],
        providers: [
          {
            provide: MAT_SNACK_BAR_DATA,
            useValue: SnackbarSourceEvent.Create,
          },
          {
            provide: MatSnackBarRef,
            useValue: {
              dismiss: jasmine.createSpy(),
            },
          },
        ],
      }).compileComponents();
    }),
  );

  beforeEach((): void => {
    snackbarRef = TestBed.inject(MatSnackBarRef) as jasmine.SpyObj<
      MatSnackBarRef<SnackbarSuccessComponent>
    >;
    fixture = TestBed.createComponent(SnackbarSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should show the create message', (): void => {
    // Arrange
    const message: HTMLElement = fixture.debugElement.query(By.css('span'))
      .nativeElement;

    // Assert
    expect(message.innerText).toBe('Create successful');
  });

  it('should show the delete message', (): void => {
    // Arrange
    component.snackbarSource = SnackbarSourceEvent.Delete;
    fixture.detectChanges();
    const message: HTMLElement = fixture.debugElement.query(By.css('span'))
      .nativeElement;

    // Assert
    expect(message.innerText).toBe('Delete successful');
  });

  it('should show the update message', (): void => {
    // Arrange
    component.snackbarSource = SnackbarSourceEvent.Update;
    fixture.detectChanges();
    const message: HTMLElement = fixture.debugElement.query(By.css('span'))
      .nativeElement;

    // Assert
    expect(message.innerText).toBe('Update successful');
  });

  it(
    'should call the MatSnackbarRef dismiss method when clicking the ' +
      '"Close" button',
    (): void => {
      // Arrange
      const closeButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('button'),
      ).nativeElement;

      // Act
      closeButton.click();

      // Assert
      expect(snackbarRef.dismiss).toHaveBeenCalledTimes(1);
    },
  );
});
