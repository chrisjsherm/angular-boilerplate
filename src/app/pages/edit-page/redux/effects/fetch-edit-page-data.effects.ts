import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Hero } from '../../../../models/hero.entity';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  fetchEditPageData,
  fetchEditPageDataFailure,
  fetchEditPageDataSuccess,
} from '../actions/fetch-edit-page-data.actions';

/**
 * Side effects arising from actions to fetch edit page data
 */
@Injectable()
export class FetchEditPageDataEffects {
  constructor(
    private actions$: Actions,
    private heroesHttpService: HeroesHttpService,
  ) {}

  fetchEditPageData$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(fetchEditPageData),
        switchMap(
          (): Observable<Action> => {
            return this.heroesHttpService.read().pipe(
              map(
                (heroes: Hero[]): Action => {
                  return fetchEditPageDataSuccess({
                    heroes,
                  });
                },
              ),
              catchError(
                (error: HttpErrorResponse): Observable<Action> =>
                  of(fetchEditPageDataFailure({ error })),
              ),
            );
          },
        ),
      ),
  );
}
