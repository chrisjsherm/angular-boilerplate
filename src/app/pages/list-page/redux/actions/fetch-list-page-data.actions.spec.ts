import {
  fetchListPageData,
  fetchListPageDataSuccess,
  fetchListPageDataFailure,
} from './fetch-list-page-data.actions';
import { Hero } from '../../../../models/hero.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';

describe('Fetch list page data actions', (): void => {
  it('should return a fetch list page data action', (): void => {
    expect(fetchListPageData().type).toBe(
      '[ListPageComponent] Fetch list page data',
    );
  });

  it('should return a fetch list page data success action', (): void => {
    // Arrange
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
    const result = fetchListPageDataSuccess({
      heroes: data,
    });

    // Assert
    expect(result.type).toBe(
      '[FetchListPageDataEffects] Fetch list page data success',
    );
    expect(result.heroes).toBe(data);
  });

  it('should return a fetch list page data failure action', (): void => {
    // Arrange
    const error: HttpErrorResponse = {
      message: getStatusText(SERVICE_UNAVAILABLE),
      status: SERVICE_UNAVAILABLE,
    } as HttpErrorResponse;

    // Act
    const result = fetchListPageDataFailure({ error });

    // Assert
    expect(result.type).toBe(
      '[FetchListPageDataEffects] Fetch list page data failure',
    );
    expect(result.error.status).toBe(503);
  });
});
