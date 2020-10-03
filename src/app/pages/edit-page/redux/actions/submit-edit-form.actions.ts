import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { HeroFormValues } from '../../hero-form-values.interface';

export const submitEditForm = createAction(
  '[EditPageComponent] Submit edit form',
  props<{ id: string; formValues: HeroFormValues }>(),
);

export const submitEditFormSuccess = createAction(
  '[SubmitEditFormEffects] Submit edit form success',
  props<{ id: string; formValues: HeroFormValues }>(),
);

export const submitEditFormFailure = createAction(
  '[SubmitEditFormEffects] Submit edit form failure',
  props<{ id: string; formValues: HeroFormValues; error: HttpErrorResponse }>(),
);