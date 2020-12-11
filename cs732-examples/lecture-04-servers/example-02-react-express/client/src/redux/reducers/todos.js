import { ADD_TODO, SET_TODO_COMPLETE, LOAD_TODOS_LOADING, LOAD_TODOS_SUCCESS, LOAD_TODOS_ERROR } from '../actions/action-types';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

/**
 * This function handles modifications to the "todos" property of the overall state.
 * 
 * @param state the current todos array. Will be set to [] if it doesn't yet exist.
 * @param action the modification to make to the array
 * @returns the new todos array
 */
export default function todos(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {

        case ADD_TODO:
            return todos_AddTodo(state, action);

        case SET_TODO_COMPLETE:
            return todos_SetTodoComplete(state, action);

        case LOAD_TODOS_LOADING:
            return todos_LoadTodosLoading(state, action);

        case LOAD_TODOS_SUCCESS:
            return todos_LoadTodosSuccess(state, action);

        case LOAD_TODOS_ERROR:
            return todos_LoadTodosError(state, action);

        default:
            return state;
    }
}

/**
 * To add a new todo, return a new array with the contents of the old array plus a new todo with
 * its `text` set to the given text, and its `completed` status set to `false`.
 */
function todos_AddTodo(state, action) {
    return [
        ...state,
        {
            id: uuid(),
            text: action.text,
            completed: false,
            modified: moment().format()
        }
    ];
}

/**
 * To change a todo's `completed` status, return a new array where each element in the array is the same
 * as the corresponding element in the source array, except the one at the given `index`. That one element
 * should be a copy of the old todo, with its `completed` status set to the given value.
 */
function todos_SetTodoComplete(state, action) {
    return state.map((todo, index) => {

        if (index === action.index) {
            return Object.assign({}, todo, {
                completed: action.completed,
                modified: moment().format()
            });
        }

        return todo;
    });
}

/**
 * In this function, we could, if we wanted, set some kind of state to signify that todos are currently being
 * loaded from the backend. For example, set a flag that would signal the UI to display a "loading..." bar.
 */
function todos_LoadTodosLoading(state, action) {
    return state;
}

/**
 * In this function, we examine the todo items that have just been loaded from the backend, and merge them with
 * any todos which are already in the current state. Exactly how you might do this is application-dependent.
 * 
 * In this case, if there are any incoming todos with different ids than those already in the state, they will be added.
 * Also, any incoming todos with the same ids, but a later modification date, will overwrite todos which are already there.
 */
function todos_LoadTodosSuccess(state, action) {

    const incoming = action.todos;

    // Create a new array, where, foreach todo in the existing array...
    const mergedTodos = state.map((todo, index) => {

        // If an incoming todo has the same id as the todo at this index, AND that
        // incoming todo has a later modified time...
        const match = incoming.find(inc => inc.id === todo.id);
        if (match && moment(match.modified).isAfter(todo.modified)) {
            // substitute the incoming todo
            return match;
        }

        // Otherwise, keep the current todo
        return todo;
    });

    // Now, add all the incoming todos which have different ids
    return mergedTodos.concat(incoming.filter(todoA => state.find(todoB => todoA.id === todoB.id) === undefined));
}

/**
 * In this function, we could, if we wanted, set some kind of state to signify that there was an error loading todos
 * from the backend. For example, set some kind of error message to be displayed somewhere in the UI.
 */
function todos_LoadTodosError(state, action) {
    return state;
}