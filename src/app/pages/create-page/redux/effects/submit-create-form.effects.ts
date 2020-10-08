import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { SnackbarFailureComponent } from '../../../../atoms/snackbar-failure/snackbar-failure.component';
import { SnackbarSuccessComponent } from '../../../../atoms/snackbar-success/snackbar-success.component';
import { Hero } from '../../../../models/hero.entity';
import { SnackbarSourceEvent } from '../../../../models/snackbar-source.enum';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  submitCreateForm,
  submitCreateFormFailure,
  submitCreateFormSuccess,
} from '../actions/submit-create-form.actions';

/**
 * Side effects arising from the Action for submitting create form
 */
@Injectable()
export class SubmitCreateFormEffects {
  constructor(
    private action$: Actions,
    private heroesHttpService: HeroesHttpService,
    private router: Router,
    private snackbarService: MatSnackBar,
  ) {}

  submitCreateForm$ = createEffect(
    (): Observable<Action> => {
      return this.action$.pipe(
        ofType(submitCreateForm),
        exhaustMap(
          (action: ReturnType<typeof submitCreateForm>): Observable<Action> => {
            return this.heroesHttpService.create(action.formValues).pipe(
              map(
                (hero: Hero): Action => {
                  return submitCreateFormSuccess({ hero });
                },
              ),
              tap((): void => {
                this.snackbarService.openFromComponent(
                  SnackbarSuccessComponent,
                  {
                    data: SnackbarSourceEvent.Create,
                  },
                );
                this.router.navigate(['/heroes']);
              }),
              catchError(
                (error: HttpErrorResponse): Observable<Action> => {
                  this.snackbarService.openFromComponent(
                    SnackbarFailureComponent,
                    {
                      data: SnackbarSourceEvent.Create,
                    },
                  );
                  return of(
                    submitCreateFormFailure({
                      formValues: action.formValues,
                      error,
                    }),
                  );
                },
              ),
            );
          },
        ),
      );
    },
  );
}
