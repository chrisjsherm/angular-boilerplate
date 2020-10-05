import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { CreatePageComponent } from './create-page.component';

describe('CreatePageComponent', (): void => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(
    waitForAsync((): void => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        providers: [provideMockStore({})],
        declarations: [
          CreatePageComponent,
          MockComponents(MatFormField, MatLabel, MatError),
        ],
      }).compileComponents();
    }),
  );

  beforeEach((): void => {
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should initialize the create form', (): void => {
    expect(component.createForm).toBeDefined();
  });

  describe('Submit form', (): void => {
    it(
      'Should dispatch the submit create form Action when the user submits ' +
        'a valid form',
      (): void => {
        // Arrange
        component.createForm.setValue({
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          firstName: 'George',
          lastName: 'Washington',
          phoneNumber: '(703) 111-1111',
        });

        // Assert
        expect(component.createForm.valid).toBe(true);

        // Act
        component.onSubmit(component.createForm);

        // Assert
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
      },
    );

    it('Should not dispatch the submit create form Action when the form is invalid', (): void => {
      // Arrange
      component.createForm.setValue({
        avatarUrl: '',
        firstName: 'George',
        lastName: 'Washington',
        phoneNumber: '(703) 111-1111',
      });

      // Assert
      expect(component.createForm.valid).toBe(false);

      // Act
      component.onSubmit(component.createForm);

      // Assert
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
