import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';
import { SnackbarFailureComponent } from './snackbar-failure.component';

describe('SnackbarFailureComponent', (): void => {
  let component: SnackbarFailureComponent;
  let fixture: ComponentFixture<SnackbarFailureComponent>;
  let snackbarRef: MatSnackBarRef<SnackbarFailureComponent>;

  beforeEach(
    waitForAsync((): void => {
      TestBed.configureTestingModule({
        declarations: [SnackbarFailureComponent],
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
      MatSnackBarRef<SnackbarFailureComponent>
    >;
    fixture = TestBed.createComponent(SnackbarFailureComponent);
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
    expect(message.innerText).toBe('Create failed');
  });

  it('should show the delete message', (): void => {
    // Arrange
    component.snackbarSource = SnackbarSourceEvent.Delete;
    fixture.detectChanges();
    const message: HTMLElement = fixture.debugElement.query(By.css('span'))
      .nativeElement;

    // Assert
    expect(message.innerText).toBe('Delete failed');
  });

  it('should show the update message', (): void => {
    // Arrange
    component.snackbarSource = SnackbarSourceEvent.Update;
    fixture.detectChanges();
    const message: HTMLElement = fixture.debugElement.query(By.css('span'))
      .nativeElement;

    // Assert
    expect(message.innerText).toBe('Update failed');
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
