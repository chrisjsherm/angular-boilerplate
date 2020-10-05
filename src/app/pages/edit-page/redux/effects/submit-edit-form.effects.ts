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
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  submitEditForm,
  submitEditFormFailure,
  submitEditFormSuccess,
} from '../actions/submit-edit-form.actions';

/**
 * Side effects arising from the Action for submitting edit form
 */
@Injectable()
export class SubmitEditFormEffects {
  constructor(
    private actions$: Actions,
    private heroesHttpService: HeroesHttpService,
    private router: Router,
    private snackbarService: MatSnackBar,
  ) {}

  submitEditForm$ = createEffect(
    (): Observable<Action> => {
      return this.actions$.pipe(
        ofType(submitEditForm),
        exhaustMap(
          (action: ReturnType<typeof submitEditForm>): Observable<Action> => {
            return this.heroesHttpService
              .update(action.id, action.formValues)
              .pipe(
                map(
                  (): Action => {
                    return submitEditFormSuccess({
                      id: action.id,
                      formValues: action.formValues,
                    });
                  },
                ),
                tap((): void => {
                  this.snackbarService.openFromComponent(
                    SnackbarSuccessComponent,
                  );
                  this.router.navigate(['/heroes']);
                }),
                catchError(
                  (error: HttpErrorResponse): Observable<Action> => {
                    this.snackbarService.openFromComponent(
                      SnackbarFailureComponent,
                    );
                    return of(
                      submitEditFormFailure({
                        id: action.id,
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
