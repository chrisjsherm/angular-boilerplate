import { createAction, props } from '@ngrx/store';
import { Hero } from '../../../../models/hero.entity';
import { HttpErrorResponse } from '@angular/common/http';

export const fetchDetailPageData = createAction(
  '[DetailPageComponent] Fetch detail page data',
);

export const fetchDetailPageDataSuccess = createAction(
  '[DetailPageEffects] Fetch detail page data success',
  props<{ heroes: Hero[] }>(),
);

export const fetchDetailPageDataFailure = createAction(
  '[DetailPageEffects] Fetch detail page data failure',
  props<{ error: HttpErrorResponse }>(),
);
