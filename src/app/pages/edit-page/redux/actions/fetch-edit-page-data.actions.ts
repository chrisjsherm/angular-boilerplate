import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Hero } from '../../../../models/hero.entity';

export const fetchEditPageData = createAction(
  '[EditPageComponent] Fetch edit page data',
);

export const fetchEditPageDataSuccess = createAction(
  '[EditPageEffects] Fetch edit page data success',
  props<{ heroes: Hero[] }>(),
);

export const fetchEditPageDataFailure = createAction(
  '[EditPageEffects] Fetch edit page data failure',
  props<{ error: HttpErrorResponse }>(),
);
