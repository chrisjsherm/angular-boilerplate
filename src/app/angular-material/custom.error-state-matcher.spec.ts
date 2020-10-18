import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CustomErrorStateMatcher } from './custom.error-state-matcher';

describe('Error state matcher #isErrorState', (): void => {
  it('should return true after we mark the invalid form control touched', (): void => {
    // Arrange
    const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
    const formControl = new FormControl(undefined, [Validators.required]);

    // Act
    formControl.markAsTouched();

    // Assert
    expect(matcher.isErrorState(formControl, null)).toBe(true);
  });

  it('should return false when the form control is touched but is valid', (): void => {
    // Arrange
    const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
    const formControl = new FormControl('Reston', [Validators.required]);

    // Act
    formControl.markAsTouched();

    // Assert
    expect(matcher.isErrorState(formControl, null)).toBe(false);
  });

  it('should return true after we mark the invalid form control dirty', (): void => {
    // Arrange
    const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
    const formControl = new FormControl(undefined, [Validators.required]);

    // Act
    formControl.markAsDirty();

    // Assert
    expect(matcher.isErrorState(formControl, null)).toBe(true);
  });

  it('should return false if the form control is dirty but valid', (): void => {
    // Arrange
    const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
    const formControl = new FormControl('Reston', [Validators.required]);

    // Act
    formControl.markAsDirty();

    // Assert
    expect(matcher.isErrorState(formControl, null)).toBe(false);
  });

  it('should return true after we mark the form submitted with an invalid control', (): void => {
    // Arrange
    const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
    const formControl = new FormControl('', [Validators.required]);
    const formGroup: FormGroup = new FormGroup({
      city: formControl,
    });
    const formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    // Act
    formGroupDirective.onSubmit(new Event('submit'));

    // Assert
    expect(matcher.isErrorState(formControl, formGroupDirective)).toBe(true);
  });

  it('should return false after we mark the form submitted', (): void => {
    // Arrange
    const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
    const formControl = new FormControl('Reston', [Validators.required]);
    const formGroup: FormGroup = new FormGroup({
      city: formControl,
    });
    const formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    // Act
    formGroupDirective.onSubmit(new Event('submit'));

    // Assert
    expect(matcher.isErrorState(formControl, formGroupDirective)).toBe(false);
  });

  it('should return false after we mark an empty form submitted', (): void => {
    // Arrange
    const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
    const formGroup: FormGroup = new FormGroup({});
    const formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    // Act
    formGroupDirective.onSubmit(new Event('submit'));

    // Assert
    expect(matcher.isErrorState(null, formGroupDirective)).toBe(false);
  });

  it(
    'should return false when the form control is invalid but the control ' +
      'is not dirty or touched not part of a form',
    (): void => {
      // Arrange
      const matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
      const formControl = new FormControl('', [Validators.required]);

      // Assert
      expect(matcher.isErrorState(formControl, null)).toBe(false);
    },
  );
});
