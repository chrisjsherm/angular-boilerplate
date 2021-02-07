import { HttpErrorResponse } from '@angular/common/http';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';
import { HeroFormValues } from '../../../../organisms/hero-form/models/hero-form-values.interface';
import {
  submitEditForm,
  submitEditFormFailure,
  submitEditFormSuccess,
} from './submit-edit-form.actions';

describe('Submit edit form actions', (): void => {
  it('should issue a submit edit form action', (): void => {
    // Arrange
    const formData: HeroFormValues = {
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    };

    // Act
    const result = submitEditForm({
      id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
      formValues: formData,
    });

    // Assert
    expect(result.type).toBe('[EditPageComponent] Submit edit form');
    expect(result.formValues).toEqual({
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    });
  });

  it('should issue a submit edit form success action', (): void => {
    // Arrange
    const formData: HeroFormValues = {
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    };

    // Act
    const result = submitEditFormSuccess({
      id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
      formValues: formData,
    });

    // Assert
    expect(result.type).toBe(
      '[SubmitEditFormEffects] Submit edit form success',
    );
    expect(result.formValues).toEqual({
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    });
  });

  it('should issue a submit edit form success action', (): void => {
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
    const result = submitEditFormFailure({
      id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
      formValues: formData,
      error,
    });

    // Assert
    expect(result.type).toBe(
      '[SubmitEditFormEffects] Submit edit form failure',
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
