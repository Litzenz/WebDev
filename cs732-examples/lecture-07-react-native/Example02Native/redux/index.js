import rootReducer from './reducers';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export function getStore() {
    return store;
}

export function getState() {
    return store.getState();
}

export function getPersistor() {
    return persistor;
}