import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  fetchEditPageData,
  fetchEditPageDataFailure,
  fetchEditPageDataSuccess,
} from '../actions/fetch-edit-page-data.actions';
import { FetchEditPageDataEffects } from './fetch-edit-page-data.effects';

describe('Fetch edit page data side effects', (): void => {
  let actions$: Observable<Action>;
  let effects: FetchEditPageDataEffects;
  let httpService: jasmine.SpyObj<HeroesHttpService>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        FetchEditPageDataEffects,
        provideMockActions((): Observable<Action> => actions$),
        {
          provide: HeroesHttpService,
          useValue: {
            read: jasmine.createSpy(),
          },
        },
      ],
    });

    effects = TestBed.inject(FetchEditPageDataEffects);
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
      a: fetchEditPageData(),
    });

    // Assert
    expect(effects.fetchEditPageData$).toBeObservable(
      cold('-n', {
        n: fetchEditPageDataSuccess({
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
        a: fetchEditPageData(),
        b: fetchEditPageData(),
      });

      // Assert
      expect(effects.fetchEditPageData$).toBeObservable(
        cold('-e--n', {
          e: fetchEditPageDataFailure({
            error: new HttpErrorResponse({
              status: SERVICE_UNAVAILABLE,
              statusText: getStatusText(SERVICE_UNAVAILABLE),
            }),
          }),
          n: fetchEditPageDataSuccess({
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
