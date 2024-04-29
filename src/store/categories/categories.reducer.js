import {CATEGORIES_ACTION_TYPES} from './categories.types'

const CATEGORIES_STATE = {
    categories: [],
    isLoading:false,
    error:null,
}

export const categoriesReducer = (state= CATEGORIES_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {...state, isLoading:true };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCSESS:
            return {...state, categories: payload, isLoading:false};
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
            return {...state, error: payload, isLoading:false};
        default: 
            return state
    }
}

