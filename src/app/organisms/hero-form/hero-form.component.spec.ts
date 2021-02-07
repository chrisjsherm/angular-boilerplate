import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MockComponents } from 'ng-mocks';
import { HeroFormComponent } from './hero-form.component';
import { HeroFormValues } from './models/hero-form-values.interface';

describe('HeroFormComponent', (): void => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [
          HeroFormComponent,
          MockComponents(MatLabel, MatError, MatFormField),
        ],
        providers: [FormBuilder],
      }).compileComponents();
    },
  );

  beforeEach((): void => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should call onChange and onTouched when a form value changes', (): void => {
    // Assert
    expect(component.formGroup.value).toEqual({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      avatarUrl: '',
    });

    // Arrange
    const onChangeSpy = spyOn(component, 'onChange');
    const onTouchedSpy = spyOn(component, 'onTouched');

    // Act
    component.formGroup.get('firstName').setValue('Bruce');

    // Assert
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith({
      firstName: 'Bruce',
      lastName: '',
      phoneNumber: '',
      avatarUrl: '',
    });
    expect(onTouchedSpy).toHaveBeenCalledTimes(1);
  });

  describe('Set disabled state', (): void => {
    it('should disable the form group', (): void => {
      // Act
      component.setDisabledState(true);

      // Assert
      expect(component.formGroup.disabled).toBe(true);
    });

    it('should enable the form group', (): void => {
      // Act
      component.setDisabledState(false);

      // Assert
      expect(component.formGroup.enabled).toBe(true);
    });
  });

  describe('Validation', (): void => {
    it('should determine the form is invalid', (): void => {
      // Assert
      expect(component.formGroup.value).toEqual({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        avatarUrl: '',
      });

      // Act
      const result = component.validate();

      // Assert
      expect(result).toEqual({
        firstName: { required: true },
        lastName: { required: true },
        phoneNumber: { required: true },
        avatarUrl: { required: true },
      });
    });

    it('should determine the form is valid', (): void => {
      // Arrange
      component.formGroup.setValue({
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        firstName: 'George',
        lastName: 'Washington',
        phoneNumber: '(703) 111-1111',
      });

      // Act
      const result = component.validate();

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('Write to the form control from outside the form control component', (): void => {
    it('should not update the from group if the value is falsy', (): void => {
      // Arrange
      const setValueSpy = spyOn(component.formGroup, 'setValue');

      // Act
      component.writeValue(('' as unknown) as HeroFormValues);

      // Assert
      expect(setValueSpy).not.toHaveBeenCalled();
    });

    it('should update the from group', (): void => {
      // Arrange
      const setValueSpy = spyOn(component.formGroup, 'setValue');

      // Act
      component.writeValue({
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        firstName: 'George',
        lastName: 'Washington',
        phoneNumber: '(703) 111-1111',
      });

      // Assert
      expect(setValueSpy).toHaveBeenCalledTimes(1);
      expect(setValueSpy).toHaveBeenCalledWith(
        {
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          firstName: 'George',
          lastName: 'Washington',
          phoneNumber: '(703) 111-1111',
        },
        { emitEvent: false },
      );
    });
  });
});
