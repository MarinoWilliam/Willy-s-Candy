import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

 export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

const middlewares = [process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancer = compose(applyMiddleware(...middlewares))

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist:(keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig= {
    key: 'root',
    storage,
    whitelist: ['cart'],
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancer)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)


