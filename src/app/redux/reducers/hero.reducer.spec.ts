import { reducer, initialState } from './hero.reducer';
import { createAction } from '@ngrx/store';
import { reducers } from './app.action-reducer-map';

describe('Hero Reducer', (): void => {
  describe('an unknown action', (): void => {
    it('should maintain the initial state when the action does not match', (): void => {
      // Arrange
      const randomAction = createAction('[RandomComponent] Do something');

      // Act
      const state = reducers.heroes(initialState, randomAction);

      // Assert
      expect(state).toBe(initialState);
    });
  });
});
