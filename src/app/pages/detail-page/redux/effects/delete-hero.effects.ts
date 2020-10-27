import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { DeleteHeroDialogComponent } from '../../../../dialogs/delete-hero-dialog/delete-hero-dialog.component';
import { Hero } from '../../../../models/hero.entity';
import {
  cancelDeleteHeroDialog,
  completeDeleteHeroDialog,
  openDeleteHeroDialog,
} from '../actions/delete-hero.actions';

/**
 * Side effects arising from actions to delete a hero
 */
@Injectable()
export class DeleteHeroEffects {
  constructor(
    private actions$: Actions,
    private dialogService: MatDialog,
    private router: Router,
  ) {}

  /**
   * Open a dialog to confirm deletion of the hero
   */
  deleteHero$ = createEffect(
    (): Observable<Action> => {
      return this.actions$.pipe(
        ofType(openDeleteHeroDialog),
        exhaustMap(
          (
            action: ReturnType<typeof openDeleteHeroDialog>,
          ): Observable<Action> => {
            return this.dialogService
              .open<DeleteHeroDialogComponent, Hero, Hero>(
                DeleteHeroDialogComponent,
                {
                  data: action.hero,
                },
              )
              .afterClosed()
              .pipe(
                map(
                  (hero: Hero): Action => {
                    if (hero) {
                      this.router.navigate(['/heroes']);
                      return completeDeleteHeroDialog({ hero });
                    }

                    return cancelDeleteHeroDialog({ hero: action.hero });
                  },
                ),
              );
          },
        ),
      );
    },
  );
}
