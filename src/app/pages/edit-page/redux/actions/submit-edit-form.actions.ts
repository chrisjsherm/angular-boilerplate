import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { HeroFormValues } from '../../hero-form-values.interface';

export const submitEditForm = createAction(
  '[EditPageComponent] Submit edit form',
  props<{ formValues: HeroFormValues }>(),
);

export const submitEditFormSuccess = createAction(
  '[SubmitEditFormEffects] Submit edit form success',
  props<{ formValues: HeroFormValues }>(),
);

export const submitEditFormFailure = createAction(
  '[SubmitEditFormEffects] Submit edit form failure',
  props<{ formValues: HeroFormValues; error: HttpErrorResponse }>(),
);
