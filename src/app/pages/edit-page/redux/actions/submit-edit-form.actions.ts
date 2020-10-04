import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { HeroFormValues } from '../../../../models/hero-form-values.interface';

export const submitEditForm = createAction(
  '[EditPageComponent] Submit edit form',
  props<{ id: string; formValues: Partial<HeroFormValues> }>(),
);

export const submitEditFormSuccess = createAction(
  '[SubmitEditFormEffects] Submit edit form success',
  props<{ id: string; formValues: Partial<HeroFormValues> }>(),
);

export const submitEditFormFailure = createAction(
  '[SubmitEditFormEffects] Submit edit form failure',
  props<{
    id: string;
    formValues: Partial<HeroFormValues>;
    error: HttpErrorResponse;
  }>(),
);
