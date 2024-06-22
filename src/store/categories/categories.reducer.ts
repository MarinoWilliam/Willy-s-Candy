import { AnyAction } from 'redux';
import { Category } from './categories.types'

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} from './categories.action';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const CATEGORIES_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (
  state = CATEGORIES_STATE,
  action : AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }
  if (fetchCategoriesFail.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;


}

