import {
  fetchDetailPageData,
  fetchDetailPageDataSuccess,
  fetchDetailPageDataFailure,
} from './fetch-detail-page-data.actions';
import { Hero } from '../../../../models/hero.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';

describe('Fetch detail page data actions', (): void => {
  it('should return a fetch heroes action', (): void => {
    expect(fetchDetailPageData().type).toBe(
      '[DetailPageComponent] Fetch detail page data',
    );
  });

  it('should issue a fetch heroes success action', (): void => {
    const data: Hero[] = [
      {
        id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
        firstName: 'George',
        lastName: 'Washington',
        fullName: 'George Washington',
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
      },
      {
        id: '26bbe379-b165-4ccf-b993-aefff76b4790',
        firstName: 'John',
        lastName: 'Wayne',
        fullName: 'John Wayne',
        phoneNumber: '(210) 555-5555',
        avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
      },
    ];

    // Act
    const result = fetchDetailPageDataSuccess({
      heroes: data,
    });

    // Assert
    expect(result.type).toBe(
      '[DetailPageEffects] Fetch detail page data success',
    );
    expect(result.heroes).toEqual([
      {
        id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
        firstName: 'George',
        lastName: 'Washington',
        fullName: 'George Washington',
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
      },
      {
        id: '26bbe379-b165-4ccf-b993-aefff76b4790',
        firstName: 'John',
        lastName: 'Wayne',
        fullName: 'John Wayne',
        phoneNumber: '(210) 555-5555',
        avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
      },
    ]);
  });

  it('should issue a fetch heroes failure action', (): void => {
    const error: HttpErrorResponse = {
      message: getStatusText(SERVICE_UNAVAILABLE),
      status: SERVICE_UNAVAILABLE,
    } as HttpErrorResponse;

    // Act
    const result = fetchDetailPageDataFailure({
      error,
    });

    // Assert
    expect(result.type).toBe(
      '[DetailPageEffects] Fetch detail page data failure',
    );
    expect(result.error.status).toBe(503);
  });
});
