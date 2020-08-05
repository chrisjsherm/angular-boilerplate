import { AppState } from '../app-state.interface';
import { Hero } from '../../models/hero.entity';
import { createSelector } from '@ngrx/store';

export const selectHeroes = (state: AppState): Hero[] => state.heroes;

export const selectHeroById = createSelector(
  selectHeroes,
  (heroes: Hero[], heroId: string): Hero | null => {
    if (!heroes) {
      return null;
    }

    return heroes.find((hero: Hero): boolean => hero.id === heroId) ?? null;
  },
);
