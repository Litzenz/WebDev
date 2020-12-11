import { ADD_EVENT, LOAD_EVENTS_LOADING, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_ERROR } from '../actions/action-types';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

/**
 * This function handles modifications to the "events" property of the overall state. Currently supports
 * adding new events.
 * 
 * @param state the current events array. Will be set to [] if it doesn't yet exist.
 * @param action the modification to make to the array
 * @returns the new events array
 */
export default function events(state = [], action) {
    switch (action.type) {

        case ADD_EVENT:
            return events_AddEvent(state, action);

        case LOAD_EVENTS_LOADING:
            return events_LoadEventsLoading(state, action);

        case LOAD_EVENTS_SUCCESS:
            return events_LoadEventsSuccess(state, action);

        case LOAD_EVENTS_ERROR:
            return events_LoadEventsError(state, action);

        default:
            return state;
    }
}

/**
 * To add an event, return a new array with the contents of the old array plus the given event.
 */
function events_AddEvent(state, action) {
    return [
        ...state,
        {
            ...action.event,
            id: uuid(),
            modified: moment().format()
        }
    ];
}

/**
 * In this function, we could, if we wanted, set some kind of state to signify that events are currently being
 * loaded from the backend. For example, set a flag that would signal the UI to display a "loading..." bar.
 */
function events_LoadEventsLoading(state, action) {
    return state;
}

/**
 * In this function, we examine the events that have just been loaded from the backend, and merge them with
 * any events which are already in the current state. Exactly how you might do this is application-dependent.
 * 
 * In this case, if there are any incoming events with different ids than those already in the state, they will be added.
 * Also, any incoming events with the same ids, but a later modification date, will overwrite events which are already there.
 */
function events_LoadEventsSuccess(state, action) {

    const incoming = action.events;

    // Create a new array, where, foreach todo in the existing array...
    const mergedEvents = state.map((todo, index) => {

        // If an incoming event has the same id as the event at this index, AND that
        // incoming event has a later modified time...
        const match = incoming.find(inc => inc.id === todo.id);
        if (match && moment(match.modified).isAfter(todo.modified)) {
            // substitute the incoming event
            return match;
        }

        // Otherwise, keep the current event
        return todo;
    });

    // Now, add all the incoming events which have different ids
    return [
        ...mergedEvents,
        incoming.filter(eventA => state.find(eventB => eventA.id === eventB.id) === undefined)
    ]
}

/**
 * In this function, we could, if we wanted, set some kind of state to signify that there was an error loading events
 * from the backend. For example, set some kind of error message to be displayed somewhere in the UI.
 */
function events_LoadEventsError(state, action) {
    return state;
}