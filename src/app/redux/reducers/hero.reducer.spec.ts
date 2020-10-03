import { createAction } from '@ngrx/store';
import { Hero } from '../../models/hero.entity';
import { submitEditFormSuccess } from '../../pages/edit-page/redux/actions/submit-edit-form.actions';
import { fetchListPageDataSuccess } from '../../pages/list-page/redux/actions/fetch-list-page-data.actions';
import { reducers } from './app.action-reducer-map';
import { initialState } from './hero.reducer';

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

  describe('On a fetch list page data success action', (): void => {
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

  describe('On a successful submission of the edit form', (): void => {
    it(
      'should update the state with the edited firstName property of the ' +
        'hero',
      (): void => {
        // Act
        const state = reducers.heroes(
          [
            {
              id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
              firstName: 'George',
              lastName: 'Washington',
              fullName: 'George Washington',
              phoneNumber: '(703) 111-1111',
              avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
            },
            {
              id: '26bbe379-b165-4ccf-b993-aefff76b4790',
              firstName: 'John',
              lastName: 'Wayne',
              fullName: 'John Wayne',
              phoneNumber: '(210) 555-5555',
              avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
            },
          ],
          submitEditFormSuccess({
            id: '26bbe379-b165-4ccf-b993-aefff76b4790',
            formValues: {
              firstName: 'Jonathan',
            },
          }),
        );

        // Assert
        expect(state).toEqual([
          {
            id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
            firstName: 'George',
            lastName: 'Washington',
            fullName: 'George Washington',
            phoneNumber: '(703) 111-1111',
            avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          },
          {
            id: '26bbe379-b165-4ccf-b993-aefff76b4790',
            firstName: 'Jonathan',
            lastName: 'Wayne',
            fullName: 'John Wayne',
            phoneNumber: '(210) 555-5555',
            avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
          },
        ]);
      },
    );

    it(
      'should update the state with the edited lastName, phoneNumber, and ' +
        'avatarUrl properties of the hero',
      (): void => {
        // Act
        const state = reducers.heroes(
          [
            {
              id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
              firstName: 'George',
              lastName: 'Washington',
              fullName: 'George Washington',
              phoneNumber: '(703) 111-1111',
              avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
            },
            {
              id: '26bbe379-b165-4ccf-b993-aefff76b4790',
              firstName: 'John',
              lastName: 'Wayne',
              fullName: 'John Wayne',
              phoneNumber: '(210) 555-5555',
              avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
            },
          ],
          submitEditFormSuccess({
            id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
            formValues: {
              lastName: 'Washington I',
              phoneNumber: '(703) 555-5555',
              avatarUrl: 'https://avatar.com/gwu/profile.jpg',
            },
          }),
        );

        // Assert
        expect(state).toEqual([
          {
            id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
            firstName: 'George',
            lastName: 'Washington I',
            fullName: 'George Washington',
            phoneNumber: '(703) 555-5555',
            avatarUrl: 'https://avatar.com/gwu/profile.jpg',
          },
          {
            id: '26bbe379-b165-4ccf-b993-aefff76b4790',
            firstName: 'John',
            lastName: 'Wayne',
            fullName: 'John Wayne',
            phoneNumber: '(210) 555-5555',
            avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
          },
        ]);
      },
    );
  });
});
