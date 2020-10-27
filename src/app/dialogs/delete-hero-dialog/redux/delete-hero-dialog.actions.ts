import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Hero } from '../../../models/hero.entity';

export const submitDeleteHero = createAction(
  '[DeleteHeroDialog] Submit delete hero',
  props<{
    hero: Hero;
    closeDialog: () => void;
  }>(),
);

export const submitDeleteHeroSuccess = createAction(
  '[DeleteHeroDialogEffects] Submit delete hero success',
  props<{ hero: Hero }>(),
);

export const submitDeleteHeroFailure = createAction(
  '[DeleteHeroDialogEffects] Submit delete hero failure',
  props<{ error: HttpErrorResponse; hero: Hero }>(),
);
