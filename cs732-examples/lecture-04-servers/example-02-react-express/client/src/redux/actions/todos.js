import { ADD_TODO, SET_TODO_COMPLETE, LOAD_TODOS_LOADING, LOAD_TODOS_SUCCESS, LOAD_TODOS_ERROR } from './action-types';

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export function setTodoComplete(index, completed) {
    return {
        type: SET_TODO_COMPLETE,
        index,
        completed
    }
}

export function loadTodosLoading() {
    return {
        type: LOAD_TODOS_LOADING
    }
}

export function loadTodosSuccess(todos) {
    return {
        type: LOAD_TODOS_SUCCESS,
        todos
    }
}

export function loadTodosError(err) {
    return {
        type: LOAD_TODOS_ERROR,
        err
    }
}