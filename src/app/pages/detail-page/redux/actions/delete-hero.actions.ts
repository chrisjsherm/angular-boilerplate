import { createAction, props } from '@ngrx/store';
import { Hero } from '../../../../models/hero.entity';

export const openDeleteHeroDialog = createAction(
  '[DetailPageComponent] Open delete hero confirmation dialog',
  props<{ hero: Hero }>(),
);

export const completeDeleteHeroDialog = createAction(
  '[DeleteHeroEffects] Delete hero dialog complete',
  props<{ hero: Hero }>(),
);

export const cancelDeleteHeroDialog = createAction(
  '[DeleteHeroEffects] Delete hero dialog cancellation',
  props<{ hero: Hero }>(),
);
