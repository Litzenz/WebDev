import { actionIncrement, actionDecrement, rootReducer } from '../redux-stuff';
import { createStore } from 'redux';

let store;

/**
 * Re-initialize the store to default before each test.
 */
beforeEach(() => {
    store = createStore(rootReducer);
})

/**
 * Tests that the store's initial state is exactly one property, called value, with the initial value of 0.
 */
it('check the initial store state', () => {
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(1);
    expect(keys[0]).toBe('value');
    expect(store.getState().value).toBe(0);
});

it('incrementing once works', () => {
    store.dispatch(actionIncrement(3));
    expect(store.getState().value).toBe(3);
})

it('incrementing twice works', () => {
    store.dispatch(actionIncrement(2));
    store.dispatch(actionIncrement(7));
    expect(store.getState().value).toBe(9);
})

it('decrementing once works', () => {
    store.dispatch(actionDecrement(5));
    expect(store.getState().value).toBe(-5);
})

it('decrementing twice works', () => {
    store.dispatch(actionDecrement(5));
    store.dispatch(actionDecrement(21));
    expect(store.getState().value).toBe(-26);
})

it('incrementing and decrementing combo works', () => {
    store.dispatch(actionDecrement(5));
    store.dispatch(actionIncrement(21));
    store.dispatch(actionDecrement(13));
    store.dispatch(actionIncrement(42));
    store.dispatch(actionDecrement(8));
    store.dispatch(actionDecrement(2));
    store.dispatch(actionIncrement(5));
    expect(store.getState().value).toBe(40);
});