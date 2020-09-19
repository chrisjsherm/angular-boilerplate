import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  submitEditForm,
  submitEditFormFailure,
  submitEditFormSuccess,
} from '../actions/submit-edit-form.actions';

/**
 * Side effects arising from the Action for submitting edit page page
 */
@Injectable()
export class SubmitEditFormEffects {
  constructor(
    private actions$: Actions,
    private heroesHttpService: HeroesHttpService,
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
                catchError(
                  (error: HttpErrorResponse): Observable<Action> => {
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
