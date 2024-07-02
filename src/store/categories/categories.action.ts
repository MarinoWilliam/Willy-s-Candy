import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types"

import {
    createAction,
    Action,
    ActionWithPayload,
    withMatcher,
} from "../../utils/reducer/reducer.utils"

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCSESS, Category[]>
export type FetchCategoriesFail = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START))


export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCSESS, categories))


export const fetchCategoriesFail = withMatcher((error: Error): FetchCategoriesFail =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error))

