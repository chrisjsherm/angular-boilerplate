import { createReducer, on } from '@ngrx/store';
import { Hero } from '../../models/hero.entity';
import { fetchListPageDataSuccess } from '../../pages/list-page/redux/actions/fetch-list-page-data.actions';

export const initialState: Hero[] = null;

export const reducer = createReducer(
  initialState,
  on(
    fetchListPageDataSuccess,
    (
      state: Hero[],
      action: ReturnType<typeof fetchListPageDataSuccess>,
    ): Hero[] => {
      return action.heroes;
    },
  ),
);
