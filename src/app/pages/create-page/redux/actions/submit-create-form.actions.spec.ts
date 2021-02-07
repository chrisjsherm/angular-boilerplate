import { HttpErrorResponse } from '@angular/common/http';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';
import { HeroFormValues } from '../../../../organisms/hero-form/models/hero-form-values.interface';
import {
  submitCreateForm,
  submitCreateFormFailure,
  submitCreateFormSuccess,
} from './submit-create-form.actions';

describe('Submit create form actions', (): void => {
  it('should issue a submit create form action', (): void => {
    // Arrange
    const formData: HeroFormValues = {
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    };

    // Act
    const result = submitCreateForm({
      formValues: formData,
    });

    // Assert
    expect(result.type).toBe('[CreatePageComponent] Submit create form');
    expect(result.formValues).toEqual({
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    });
  });

  it('should issue a submit create form success action', (): void => {
    // Arrange
    const formData: HeroFormValues = {
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    };

    // Act
    const result = submitCreateFormSuccess({
      hero: {
        id: '1',
        firstName: 'G.',
        lastName: 'Washington',
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        fullName: 'G. Washington',
      },
    });

    // Assert
    expect(result.type).toBe(
      '[SubmitCreateFormEffects] Submit create form success',
    );
    expect(result.hero).toEqual({
      id: '1',
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
      fullName: 'G. Washington',
    });
  });

  it('should issue a submit create form failure action', (): void => {
    // Arrange
    const formData: HeroFormValues = {
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    };
    const error: HttpErrorResponse = {
      message: getStatusText(SERVICE_UNAVAILABLE),
      status: SERVICE_UNAVAILABLE,
    } as HttpErrorResponse;

    // Act
    const result = submitCreateFormFailure({
      formValues: formData,
      error,
    });

    // Assert
    expect(result.type).toBe(
      '[SubmitCreateFormEffects] Submit create form failure',
    );
    expect(result.formValues).toEqual({
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    });
    expect(result.error.status).toBe(503);
  });
});
