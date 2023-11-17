import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from "./authSlice";
import topicSlice from "./topicSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalSlice from "./modalSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authSlice,
    topic: topicSlice,
    modal: modalSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
