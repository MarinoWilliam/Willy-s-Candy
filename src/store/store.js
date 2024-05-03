import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware()

const middlewares = [process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware,
].filter(Boolean);

const composedEnhancer = compose(applyMiddleware(...middlewares))

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancer)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)


