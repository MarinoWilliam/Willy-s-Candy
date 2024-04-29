import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from "redux-logger";
import {thunk} from "redux-thunk"
import { rootReducer } from "./root-reducer";

const middlewares = [process.env.NODE_ENV !== 'production' && logger,
thunk,
].filter(Boolean);

const composedEnhancer = compose(applyMiddleware(...middlewares))

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['user'],
    whiteList:['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancer)

export const persistor = persistStore(store)


