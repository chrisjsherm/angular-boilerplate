import { createReducer, on } from '@ngrx/store';
import { Hero } from '../../models/hero.entity';
import { fetchDetailPageDataSuccess } from '../../pages/detail-page/redux/actions/fetch-detail-page-data.actions';
import { fetchEditPageDataSuccess } from '../../pages/edit-page/redux/actions/fetch-edit-page-data.actions';
import { submitEditFormSuccess } from '../../pages/edit-page/redux/actions/submit-edit-form.actions';
import { fetchListPageDataSuccess } from '../../pages/list-page/redux/actions/fetch-list-page-data.actions';

export const initialState: Hero[] = undefined;

export const reducer = createReducer(
  initialState,
  on(
    fetchDetailPageDataSuccess,
    fetchEditPageDataSuccess,
    fetchListPageDataSuccess,
    (
      state: Hero[],
      action: ReturnType<typeof fetchListPageDataSuccess>,
    ): Hero[] => {
      return action.heroes;
    },
  ),

  on(
    submitEditFormSuccess,
    (
      state: Hero[],
      action: ReturnType<typeof submitEditFormSuccess>,
    ): Hero[] => {
      return state.map(
        (hero: Hero): Hero => {
          if (hero.id === action.id) {
            return {
              ...hero,
              ...action.formValues,
            };
          }

          return hero;
        },
      );
    },
  ),
);
