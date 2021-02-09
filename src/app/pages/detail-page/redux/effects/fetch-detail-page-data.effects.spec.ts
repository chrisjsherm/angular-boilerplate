import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  fetchDetailPageData,
  fetchDetailPageDataFailure,
  fetchDetailPageDataSuccess,
} from '../actions/fetch-detail-page-data.actions';
import { FetchDetailPageDataEffects } from './fetch-detail-page-data.effects';

describe('Fetch detail page data side effects', (): void => {
  let actions$: Observable<Action>;
  let effects: FetchDetailPageDataEffects;
  let httpService: jasmine.SpyObj<HeroesHttpService>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        FetchDetailPageDataEffects,
        provideMockActions((): Observable<Action> => actions$),
        {
          provide: HeroesHttpService,
          useValue: {
            read: jasmine.createSpy(),
          },
        },
      ],
    });

    effects = TestBed.inject(FetchDetailPageDataEffects);
    httpService = TestBed.inject(HeroesHttpService) as jasmine.SpyObj<
      HeroesHttpService
    >;
  });

  it('should be created', (): void => {
    expect(effects).toBeDefined();
  });

  it('should trigger a call to fetch heroes and issue a success action', (): void => {
    // Arrange
    httpService.read.and.returnValue(
      of([
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
      ]),
    );

    // Act
    actions$ = hot('-a', {
      a: fetchDetailPageData(),
    });

    // Assert
    expect(effects.fetchDetailPageData$).toBeObservable(
      cold('-n', {
        n: fetchDetailPageDataSuccess({
          heroes: [
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
          ],
        }),
      }),
    );
  });

  it(
    'should trigger a call to fetch heroes and issue a failure action. The ' +
      'effect should stay alive for future actions',
    (): void => {
      // Arrange
      httpService.read.and.returnValues(
        throwError(
          new HttpErrorResponse({
            status: SERVICE_UNAVAILABLE,
            statusText: getStatusText(SERVICE_UNAVAILABLE),
          }),
        ),
        of([
          {
            id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
            firstName: 'George',
            lastName: 'Washington',
            fullName: 'George Washington',
            phoneNumber: '(703) 111-1111',
            avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          },
        ]),
      );

      // Act
      actions$ = hot('-a--b', {
        a: fetchDetailPageData(),
        b: fetchDetailPageData(),
      });

      // Assert
      expect(effects.fetchDetailPageData$).toBeObservable(
        cold('-e--n', {
          e: fetchDetailPageDataFailure({
            error: new HttpErrorResponse({
              status: SERVICE_UNAVAILABLE,
              statusText: getStatusText(SERVICE_UNAVAILABLE),
            }),
          }),
          n: fetchDetailPageDataSuccess({
            heroes: [
              {
                id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
                firstName: 'George',
                lastName: 'Washington',
                fullName: 'George Washington',
                phoneNumber: '(703) 111-1111',
                avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
              },
            ],
          }),
        }),
      );
    },
  );
});
