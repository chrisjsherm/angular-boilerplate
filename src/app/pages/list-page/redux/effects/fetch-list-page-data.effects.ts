import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  fetchListPageData,
  fetchListPageDataSuccess,
  fetchListPageDataFailure,
} from '../actions/fetch-list-page-data.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Hero } from '../../../../models/hero.entity';
import { Action } from '@ngrx/store';

/**
 * Side effects arising from actions to fetch list page data
 */
@Injectable()
export class FetchListPageDataEffects {
  constructor(
    private actions$: Actions,
    private heroesHttpService: HeroesHttpService,
  ) {}

  fetchListPageData$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(fetchListPageData),
        switchMap(
          (): Observable<Action> => {
            return this.heroesHttpService.read().pipe(
              map(
                (heroes: Hero[]): Action => {
                  return fetchListPageDataSuccess({
                    heroes,
                  });
                },
              ),
              catchError(
                (error: HttpErrorResponse): Observable<Action> =>
                  of(fetchListPageDataFailure({ error })),
              ),
            );
          },
        ),
      ),
  );
}
