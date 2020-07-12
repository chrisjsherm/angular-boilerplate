import { selectHeroes } from './hero.selectors';

describe('Hero Selectors', (): void => {
  it('should select AppState.heroes', (): void => {
    // Act
    const selection = selectHeroes({
      heroes: [
        {
          id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
          firstName: 'George',
          lastName: 'Washington',
          phoneNumber: '(703) 111-1111',
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        },
        {
          id: '26bbe379-b165-4ccf-b993-aefff76b4790',
          firstName: 'John',
          lastName: 'Wayne',
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
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
      },
      {
        id: '26bbe379-b165-4ccf-b993-aefff76b4790',
        firstName: 'John',
        lastName: 'Wayne',
        phoneNumber: '(210) 555-5555',
        avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
      },
    ]);
  });
});
