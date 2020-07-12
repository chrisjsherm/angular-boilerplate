import { createReducer } from '@ngrx/store';
import { Hero } from '../../models/hero.entity';

export const initialState: Hero[] = null;

export const reducer = createReducer(initialState);
