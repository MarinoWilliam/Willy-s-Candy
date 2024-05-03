import {takeLatest, all, call, put} from 'redux-saga/effects'

import { getCategoriesDocs } from "../../utils/firebase/firebase.utils"
import {  fetchCategoriesSuccess, fetchCategoriesFail} from './categories.action'
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

 
export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesDocs);
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(fetchCategoriesFail(error))

    }
}
 
export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync )
}


export function* catageroriesSaga(){
    yield all([call(onFetchCategories)])
}

