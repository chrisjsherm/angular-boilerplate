import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';
import { SnackbarSuccessComponent } from './snackbar-success.component';

describe('SnackbarSuccessComponent', (): void => {
  let component: SnackbarSuccessComponent;
  let fixture: ComponentFixture<SnackbarSuccessComponent>;

  beforeEach(
    waitForAsync((): void => {
      TestBed.configureTestingModule({
        declarations: [SnackbarSuccessComponent],
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

  it('should show the update message', (): void => {
    // Arrange
    component.snackbarSource = SnackbarSourceEvent.Update;
    fixture.detectChanges();
    const message: HTMLElement = fixture.debugElement.query(By.css('span'))
      .nativeElement;

    // Assert
    expect(message.innerText).toBe('Update successful');
  });
});
