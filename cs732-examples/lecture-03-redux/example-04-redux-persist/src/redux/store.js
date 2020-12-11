import { createStore } from 'redux';
import rootReducer from './reducers';
import { addTodo, setTodoComplete, addEvent } from './actions';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Config for redux-persist
const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2
};
const pReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(rootReducer);
export const store = createStore(pReducer, composeWithDevTools());

// Some dummy data...
store.dispatch(addTodo("Do stuff"));
store.dispatch(addTodo("Do things"));
store.dispatch(addTodo("Do more stuff"));
store.dispatch(addTodo("Do more things"));
store.dispatch(addTodo("Procrastinate"));

store.dispatch(setTodoComplete(1, true));
store.dispatch(setTodoComplete(4, true));

store.dispatch(addEvent({
    start: "2020-03-06T09:00:00+13:00",
    end: "2020-03-06T16:00:00+13:00",
    name: "Lecture preparation",
    description: "Preparing for next week's lectures"
}));
store.dispatch(addEvent({
    start: "2020-03-09T09:00:00+13:00",
    end: "2020-03-09T11:00:00+13:00",
    name: "SE750 / CS732 lecture",
    description: "Introducing Redux to the class"
}));
store.dispatch(addEvent({
    start: "2020-03-09T11:00:00+13:00",
    end: "2020-03-09T13:00:00+13:00",
    name: "Lunch",
    description: "Relaxing after the lecture"
}));
store.dispatch(addEvent({
    start: "2020-03-10T09:00:00+13:00",
    end: "2020-03-10T11:00:00+13:00",
    name: "SE750 / CS732 lecture",
    description: "APIs and Exercises"
}));

// Enable persistence of the store
export const persistor = persistStore(store);