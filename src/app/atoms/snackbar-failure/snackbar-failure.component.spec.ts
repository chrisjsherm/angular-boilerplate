import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarFailureComponent } from './snackbar-failure.component';

describe('SnackbarFailureComponent', (): void => {
  let component: SnackbarFailureComponent;
  let fixture: ComponentFixture<SnackbarFailureComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [SnackbarFailureComponent],
    }).compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(SnackbarFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
