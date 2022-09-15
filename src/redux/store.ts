
import usernameReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'root', version: 1, storage }
const persistedReducer = persistReducer(persistConfig, usernameReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
export const persistor = persistStore(store)