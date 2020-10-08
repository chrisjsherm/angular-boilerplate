import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';
import { SnackbarFailureComponent } from './snackbar-failure.component';

describe('SnackbarFailureComponent', (): void => {
  let component: SnackbarFailureComponent;
  let fixture: ComponentFixture<SnackbarFailureComponent>;

  beforeEach(
    waitForAsync((): void => {
      TestBed.configureTestingModule({
        declarations: [SnackbarFailureComponent],
        providers: [
          {
            provide: MAT_SNACK_BAR_DATA,
            useValue: SnackbarSourceEvent.Create,
          },
        ],
      }).compileComponents();
    }),
  );

  beforeEach((): void => {
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

  it('should show the update message', (): void => {
    // Arrange
    component.snackbarSource = SnackbarSourceEvent.Update;
    fixture.detectChanges();
    const message: HTMLElement = fixture.debugElement.query(By.css('span'))
      .nativeElement;

    // Assert
    expect(message.innerText).toBe('Update failed');
  });
});
