import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-state.interface';
import { Hero } from '../../models/hero.entity';

export const selectHeroes = (state: AppState): Hero[] => state.heroes;
