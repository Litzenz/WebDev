import { ADD_EVENT, LOAD_EVENTS_LOADING, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_ERROR } from './action-types';

export function addEvent(event) {
    return {
        type: ADD_EVENT,
        event
    }
}

export function loadEventsLoading() {
    return {
        type: LOAD_EVENTS_LOADING
    }
}

export function loadEventsSuccess(events) {
    return {
        type: LOAD_EVENTS_SUCCESS,
        events
    }
}

export function loadEventsError(err) {
    return {
        type: LOAD_EVENTS_ERROR,
        err
    }
}