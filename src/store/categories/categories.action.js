import { CATEGORIES_ACTION_TYPES } from "./categories.types"
import { getCategoriesDocs } from "../../utils/firebase/firebase.utils"

export const fetchCategoriesStart = () => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START }
}

export const fetchCategoriesSuccess = (categories) => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCSESS, payload: categories }
}

export const fetchCategoriesFail = (error) => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, payload: error }
}

export const fetchCategoriesAsync = () => async (dispach) => {
    dispach(fetchCategoriesStart())
    try {
        const categoriesArray = await getCategoriesDocs();
        dispach(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        dispach(fetchCategoriesFail(error))
    }
}