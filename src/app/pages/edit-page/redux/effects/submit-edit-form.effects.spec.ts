import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  submitEditForm,
  submitEditFormFailure,
  submitEditFormSuccess,
} from '../actions/submit-edit-form.actions';
import { SubmitEditFormEffects } from './submit-edit-form.effects';

describe('Submit edit form side effects', (): void => {
  let actions$: Observable<Action>;
  let effects: SubmitEditFormEffects;
  let heroesHttpService: jasmine.SpyObj<HeroesHttpService>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        SubmitEditFormEffects,
        provideMockActions((): Observable<Action> => actions$),
        {
          provide: HeroesHttpService,
          useValue: {
            update: jasmine.createSpy(),
          },
        },
      ],
    });

    effects = TestBed.inject(SubmitEditFormEffects);
    heroesHttpService = TestBed.inject(HeroesHttpService) as jasmine.SpyObj<
      HeroesHttpService
    >;
  });

  it('should be created', (): void => {
    expect(effects).toBeDefined();
  });

  it('should trigger a call to update a hero and issue a success Action', (): void => {
    // Arrange
    heroesHttpService.update.and.returnValue(of(undefined));

    // Act
    actions$ = hot('-a', {
      a: submitEditForm({
        id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
        formValues: {
          firstName: 'G.',
          lastName: 'Washington',
          phoneNumber: '(703) 111-1111',
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        },
      }),
    });

    // Assert
    expect(effects.submitEditForm$).toBeObservable(
      cold('-n', {
        n: submitEditFormSuccess({
          id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
          formValues: {
            firstName: 'G.',
            lastName: 'Washington',
            phoneNumber: '(703) 111-1111',
            avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          },
        }),
      }),
    );
  });

  it(
    'should trigger a call to update a hero and issue a failure action. The ' +
      'effect should stay alive for future actions',
    (): void => {
      // Arrange
      heroesHttpService.update.and.returnValues(
        throwError(
          new HttpErrorResponse({
            status: SERVICE_UNAVAILABLE,
            statusText: getStatusText(SERVICE_UNAVAILABLE),
          }),
        ),
        of(undefined),
      );

      // Act
      actions$ = hot('-a--b', {
        a: submitEditForm({
          id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
          formValues: {
            firstName: 'G.',
            lastName: 'Washington',
            phoneNumber: '(703) 111-1111',
            avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          },
        }),
        b: submitEditForm({
          id: '26bbe379-b165-4ccf-b993-aefff76b4790',
          formValues: {
            firstName: 'John',
            lastName: 'Wayne',
            phoneNumber: '(210) 555-5555',
            avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
          },
        }),
      });

      // Assert
      expect(effects.submitEditForm$).toBeObservable(
        cold('-e--n', {
          e: submitEditFormFailure({
            id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
            formValues: {
              firstName: 'G.',
              lastName: 'Washington',
              phoneNumber: '(703) 111-1111',
              avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
            },

            error: new HttpErrorResponse({
              status: SERVICE_UNAVAILABLE,
              statusText: getStatusText(SERVICE_UNAVAILABLE),
            }),
          }),
          n: submitEditFormSuccess({
            id: '26bbe379-b165-4ccf-b993-aefff76b4790',
            formValues: {
              firstName: 'John',
              lastName: 'Wayne',
              phoneNumber: '(210) 555-5555',
              avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
            },
          }),
        }),
      );
    },
  );
});
