import { combineReducers } from 'redux';

/** Action types */

const INCREMENT = 'ACTION_INCREMENT';
const DECREMENT = 'ACTION_DECREMENT';

/** Action functions */

export function actionIncrement(amount) {
    return {
        type: INCREMENT,
        payload: amount
    }
}

export function actionDecrement(amount) {
    return {
        type: DECREMENT,
        payload: amount
    }
}

/** Reducers */
function valueReducer(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.payload;

        case DECREMENT:
            return state - action.payload;

        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    value: valueReducer
});