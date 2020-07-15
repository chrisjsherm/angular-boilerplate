import { reducer, initialState } from './hero.reducer';
import { createAction } from '@ngrx/store';
import { reducers } from './app.action-reducer-map';
import { fetchListPageDataSuccess } from '../../pages/list-page/redux/actions/fetch-list-page-data.actions';
import { Hero } from '../../models/hero.entity';

describe('Hero Reducer', (): void => {
  describe('on an unknown action', (): void => {
    it('should maintain the initial state when the action does not match', (): void => {
      // Arrange
      const randomAction = createAction('[RandomComponent] Do something');

      // Act
      const state = reducers.heroes(initialState, randomAction);

      // Assert
      expect(state).toBe(initialState);
    });
  });

  describe('on a fetch list page data success action', (): void => {
    it('should update the state with the refreshed list of heroes', (): void => {
      // Arrange
      const action = fetchListPageDataSuccess({
        heroes: [
          {
            id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
          } as Hero,
          {
            id: '63631a44-0776-40cc-979a-fc7564230c0b',
          } as Hero,
        ],
      });

      // Act
      const state = reducers.heroes(initialState, action);

      // Assert
      expect(state).toEqual([
        {
          id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
        } as Hero,
        {
          id: '63631a44-0776-40cc-979a-fc7564230c0b',
        } as Hero,
      ]);
    });
  });
});
