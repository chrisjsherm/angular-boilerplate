import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Hero } from '../../../../models/hero.entity';
import { HeroesHttpService } from '../../../../services/heroes-http/heroes-http.service';
import {
  fetchDetailPageData,
  fetchDetailPageDataFailure,
  fetchDetailPageDataSuccess,
} from '../actions/fetch-detail-page-data.actions';

/**
 * Side effects arising from actions to fetch detail page data
 */
@Injectable()
export class FetchDetailPageDataEffects {
  constructor(
    private actions$: Actions,
    private heroesHttpService: HeroesHttpService,
  ) {}

  fetchDetailPageData$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(fetchDetailPageData),
        switchMap(
          (): Observable<Action> => {
            return this.heroesHttpService.read().pipe(
              map(
                (heroes: Hero[]): Action => {
                  return fetchDetailPageDataSuccess({
                    heroes,
                  });
                },
              ),
              catchError(
                (error: HttpErrorResponse): Observable<Action> =>
                  of(fetchDetailPageDataFailure({ error })),
              ),
            );
          },
        ),
      ),
  );
}
