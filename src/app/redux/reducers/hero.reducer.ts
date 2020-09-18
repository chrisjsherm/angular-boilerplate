import { createReducer, on } from '@ngrx/store';
import { Hero } from '../../models/hero.entity';
import { fetchDetailPageDataSuccess } from '../../pages/detail-page/redux/actions/fetch-detail-page-data.actions';
import { fetchEditPageDataSuccess } from '../../pages/edit-page/redux/actions/fetch-edit-page-data.actions';
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
);
