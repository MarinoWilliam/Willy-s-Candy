import {all, call} from 'typed-redux-saga'

import { catageroriesSaga } from './categories/categories.saga'
import { userSaga } from './user/user.saga'

export function* rootSaga() {
    yield* all([call(catageroriesSaga), call(userSaga)])
}

