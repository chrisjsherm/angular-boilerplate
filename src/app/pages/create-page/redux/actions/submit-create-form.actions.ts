import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { HeroFormValues } from '../../../../models/hero-form-values.interface';
import { Hero } from '../../../../models/hero.entity';

export const submitCreateForm = createAction(
  '[CreatePageComponent] Submit create form',
  props<{ formValues: HeroFormValues }>(),
);

export const submitCreateFormSuccess = createAction(
  '[SubmitCreateFormEffects] Submit create form success',
  props<{ hero: Hero }>(),
);

export const submitCreateFormFailure = createAction(
  '[SubmitCreateFormEffects] Submit create form failure',
  props<{
    formValues: HeroFormValues;
    error: HttpErrorResponse;
  }>(),
);
