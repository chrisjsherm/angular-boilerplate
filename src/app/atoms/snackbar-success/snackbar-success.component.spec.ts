import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarSuccessComponent } from './snackbar-success.component';

describe('SnackbarSuccessComponent', (): void => {
  let component: SnackbarSuccessComponent;
  let fixture: ComponentFixture<SnackbarSuccessComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [SnackbarSuccessComponent],
    }).compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(SnackbarSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
