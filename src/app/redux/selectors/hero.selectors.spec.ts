import { selectHeroes, selectHeroById } from './hero.selectors';
import { Hero } from '../../models/hero.entity';

describe('Hero Selectors', (): void => {
  describe('selectHeroes', (): void => {
    it('should select AppState.heroes', (): void => {
      // Act
      const selection = selectHeroes({
        heroes: [
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
      });

      // Assert
      expect(selection.length).toBe(2);
      expect(selection).toEqual([
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
      ]);
    });
  });

  describe('selectHeroById', (): void => {
    it('should return undefined when heroes have an undefined state value', (): void => {
      // Act
      const hero: Hero = selectHeroById(
        {
          heroes: undefined,
        },
        '1c300a8d-0fd0-41a9-98e2-de19a9ee8747',
      );

      // Assert
      expect(hero).toEqual(undefined);
    });

    it('should return null when heroes have a null state value', (): void => {
      // Act
      const hero: Hero = selectHeroById(
        {
          heroes: null,
        },
        '1c300a8d-0fd0-41a9-98e2-de19a9ee8747',
      );

      // Assert
      expect(hero).toEqual(null);
    });

    it('should return null when it cannot find a matching hero', (): void => {
      // Act
      const hero: Hero = selectHeroById(
        {
          heroes: [
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
        },
        '1c300a8d-0fd0-41a9-98e2-de19a9ee8747',
      );

      // Assert
      expect(hero).toEqual(null);
    });

    it('should select George Washington', (): void => {
      // Act
      const hero: Hero = selectHeroById(
        {
          heroes: [
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
        },
        'db3ee04b-05be-4403-9d48-807fb29717ec',
      );

      // Assert
      expect(hero).toEqual({
        id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
        firstName: 'George',
        lastName: 'Washington',
        fullName: 'George Washington',
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
      });
    });
  });
});
