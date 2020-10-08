import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { getStatusText, SERVICE_UNAVAILABLE } from 'http-status-codes';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { SnackbarSuccessComponent } from '../../../../atoms/snackbar-success/snackbar-success.component';
import { SnackbarSourceEvent } from '../../../../models/snackbar-source.enum';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import { ListPageComponent } from '../../../list-page/list-page.component';
import {
  submitCreateForm,
  submitCreateFormFailure,
  submitCreateFormSuccess,
} from '../actions/submit-create-form.actions';
import { SubmitCreateFormEffects } from './submit-create-form.effects';

describe('Submit create form side effects', (): void => {
  let actions$: Observable<Action>;
  let effects: SubmitCreateFormEffects;
  let heroesHttpService: jasmine.SpyObj<HeroesHttpService>;
  let router: Router;
  let snackbarService: MatSnackBar;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'heroes', component: ListPageComponent },
        ]),
      ],
      providers: [
        SubmitCreateFormEffects,
        provideMockActions((): Observable<Action> => actions$),
        {
          provide: HeroesHttpService,
          useValue: {
            create: jasmine.createSpy(),
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: jasmine.createSpy(),
          },
        },
      ],
    });

    effects = TestBed.inject(SubmitCreateFormEffects);
    heroesHttpService = TestBed.inject(HeroesHttpService) as jasmine.SpyObj<
      HeroesHttpService
    >;
    router = TestBed.inject(Router);
    snackbarService = TestBed.inject(MatSnackBar);
  });

  it('should be created', (): void => {
    expect(effects).toBeDefined();
  });

  it('should trigger a call to create a hero and issue a success Action', (): void => {
    // Arrange
    heroesHttpService.create.and.returnValue(
      of({
        id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
        firstName: 'G.',
        lastName: 'Washington',
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        fullName: 'G. Washington',
      }),
    );
    const routerSpy = spyOn(router, 'navigate');

    // Act
    actions$ = hot('-a', {
      a: submitCreateForm({
        formValues: {
          firstName: 'G.',
          lastName: 'Washington',
          phoneNumber: '(703) 111-1111',
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        },
      }),
    });

    // Assert
    expect(effects.submitCreateForm$).toBeObservable(
      cold('-n', {
        n: submitCreateFormSuccess({
          hero: {
            id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
            firstName: 'G.',
            lastName: 'Washington',
            phoneNumber: '(703) 111-1111',
            avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
            fullName: 'G. Washington',
          },
        }),
      }),
    );
    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['/heroes']);
    expect(snackbarService.openFromComponent).toHaveBeenCalledTimes(1);
    expect(snackbarService.openFromComponent).toHaveBeenCalledWith(
      SnackbarSuccessComponent,
      {
        data: SnackbarSourceEvent.Create,
      },
    );
  });

  it(
    'should trigger a call to create a hero and issue a failure action. The ' +
      'effect should stay alive for future actions',
    (): void => {
      // Arrange
      heroesHttpService.create.and.returnValues(
        throwError(
          new HttpErrorResponse({
            status: SERVICE_UNAVAILABLE,
            statusText: getStatusText(SERVICE_UNAVAILABLE),
          }),
        ),
        of({
          id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
          firstName: 'G.',
          lastName: 'Washington',
          phoneNumber: '(703) 111-1111',
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          fullName: 'G. Washington',
        }),
      );
      const routerSpy = spyOn(router, 'navigate');

      // Act
      actions$ = hot('-a--b', {
        a: submitCreateForm({
          formValues: {
            firstName: 'G.',
            lastName: 'Washington',
            phoneNumber: '(703) 111-1111',
            avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          },
        }),
        b: submitCreateForm({
          formValues: {
            firstName: 'John',
            lastName: 'Wayne',
            phoneNumber: '(210) 555-5555',
            avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
          },
        }),
      });

      // Assert
      expect(effects.submitCreateForm$).toBeObservable(
        cold('-e--n', {
          e: submitCreateFormFailure({
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
          n: submitCreateFormSuccess({
            hero: {
              id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
              firstName: 'G.',
              lastName: 'Washington',
              phoneNumber: '(703) 111-1111',
              avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
              fullName: 'G. Washington',
            },
          }),
        }),
      );
      expect(routerSpy).toHaveBeenCalledTimes(1);
      expect(routerSpy).toHaveBeenCalledWith(['/heroes']);

      expect(snackbarService.openFromComponent).toHaveBeenCalledTimes(2);

      const firstSnackbarCallArguments = (snackbarService.openFromComponent as jasmine.Spy).calls.argsFor(
        0,
      );
      expect(firstSnackbarCallArguments[0].name).toBe(
        'SnackbarFailureComponent',
      );
      expect(firstSnackbarCallArguments[1].data).toEqual(
        SnackbarSourceEvent.Create,
      );

      const secondSnackbarCallArguments = (snackbarService.openFromComponent as jasmine.Spy).calls.argsFor(
        1,
      );
      expect(secondSnackbarCallArguments[0].name).toBe(
        'SnackbarSuccessComponent',
      );
      expect(secondSnackbarCallArguments[1].data).toEqual(
        SnackbarSourceEvent.Create,
      );
    },
  );
});
