import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { FetchListPageDataEffects } from './fetch-list-page-data.effects';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  fetchListPageData,
  fetchListPageDataSuccess,
  fetchListPageDataFailure,
} from '../actions/fetch-list-page-data.actions';
import { cold, hot } from 'jasmine-marbles';
import { HttpErrorResponse } from '@angular/common/http';
import { SERVICE_UNAVAILABLE, getStatusText } from 'http-status-codes';

describe('Fetch list page data side effects', (): void => {
  let actions$: Observable<Action>;
  let effects: FetchListPageDataEffects;
  let heroesHttpService: jasmine.SpyObj<HeroesHttpService>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        FetchListPageDataEffects,
        provideMockActions((): Observable<Action> => actions$),
        {
          provide: HeroesHttpService,
          useValue: {
            read: jasmine.createSpy(),
          },
        },
      ],
    });

    effects = TestBed.inject(FetchListPageDataEffects);
    heroesHttpService = TestBed.inject(HeroesHttpService) as jasmine.SpyObj<
      HeroesHttpService
    >;
  });

  it('should be created', (): void => {
    expect(effects).toBeDefined();
  });

  it('should trigger a call to fetch heroes and issue a success action', (): void => {
    // Arrange
    heroesHttpService.read.and.returnValue(
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
      a: fetchListPageData(),
    });

    // Assert
    expect(effects.fetchListPageData$).toBeObservable(
      cold('-n', {
        n: fetchListPageDataSuccess({
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
      heroesHttpService.read.and.returnValues(
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
        a: fetchListPageData(),
        b: fetchListPageData(),
      });

      // Assert
      expect(effects.fetchListPageData$).toBeObservable(
        cold('-e--n', {
          e: fetchListPageDataFailure({
            error: new HttpErrorResponse({
              status: SERVICE_UNAVAILABLE,
              statusText: getStatusText(SERVICE_UNAVAILABLE),
            }),
          }),
          n: fetchListPageDataSuccess({
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
