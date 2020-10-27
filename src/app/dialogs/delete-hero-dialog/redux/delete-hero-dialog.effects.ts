import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HeroesHttpService } from '../../../services/heroes-http/heroes-http.service';
import {
  submitDeleteHero,
  submitDeleteHeroFailure,
  submitDeleteHeroSuccess,
} from './delete-hero-dialog.actions';

/**
 * Side effects originating from the delete hero dialog
 */
@Injectable()
export class DeleteHeroDialogEffects {
  constructor(
    private actions$: Actions,
    private heroHttpService: HeroesHttpService,
  ) {}

  submitDelete$ = createEffect(
    (): Observable<Action> => {
      return this.actions$.pipe(
        ofType(submitDeleteHero),
        exhaustMap(
          (action: ReturnType<typeof submitDeleteHero>): Observable<Action> => {
            return this.heroHttpService.delete(action.hero.id).pipe(
              map(
                (): Action => {
                  action.closeDialog();
                  return submitDeleteHeroSuccess({
                    hero: action.hero,
                  });
                },
              ),
              catchError(
                (error: HttpErrorResponse): Observable<Action> => {
                  return of(
                    submitDeleteHeroFailure({ error, hero: action.hero }),
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
