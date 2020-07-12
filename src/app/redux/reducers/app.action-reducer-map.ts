import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app-state.interface';
import { reducer as heroReducer } from './hero.reducer';

/**
 * Collect reducers in AppModule
 */
export const reducers: ActionReducerMap<AppState> = {
  heroes: heroReducer,
};
