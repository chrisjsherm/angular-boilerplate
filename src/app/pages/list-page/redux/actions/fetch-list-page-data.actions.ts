import { createAction, props } from '@ngrx/store';
import { Hero } from '../../../../models/hero.entity';
import { HttpErrorResponse } from '@angular/common/http';

export const fetchListPageData = createAction(
  '[ListPageComponent] Fetch list page data',
);

export const fetchListPageDataSuccess = createAction(
  '[FetchListPageDataEffects] Fetch list page data success',
  props<{ heroes: Hero[] }>(),
);

export const fetchListPageDataFailure = createAction(
  '[FetchListPageDataEffects] Fetch list page data failure',
  props<{ error: HttpErrorResponse }>(),
);
