import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from '../../../helpers/clone-deep.helper';
import { submitDeleteHeroSuccess } from '../../dialogs/delete-hero-dialog/redux/delete-hero-dialog.actions';
import { Hero } from '../../models/hero.entity';
import { submitCreateFormSuccess } from '../../pages/create-page/redux/actions/submit-create-form.actions';
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
    submitCreateFormSuccess,
    (
      state: Hero[],
      action: ReturnType<typeof submitCreateFormSuccess>,
    ): Hero[] => {
      if (!state) {
        return [action.hero];
      }

      const updatedState = cloneDeep(state);
      updatedState.unshift(action.hero);
      return updatedState;
    },
  ),

  on(
    submitDeleteHeroSuccess,
    (
      state: Hero[],
      action: ReturnType<typeof submitDeleteHeroSuccess>,
    ): Hero[] => {
      return state.reduce((result: Hero[], hero: Hero): Hero[] => {
        if (hero.id !== action.hero.id) {
          result.push(hero);
        }
        return result;
      }, []);
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
