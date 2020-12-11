import Api from '../api';
import { createApiThunks } from './utils';

/**
 * Uses a provided utility function to create all thunk actions which dispatch API calls, along with all "child actions"
 * (e.g. "loading", "success", "error" actions).
 */
export const {
    listTodosThunk,
    createTodoThunk,
    updateTodoThunk,
    deleteTodoThunk
} = createApiThunks(Api);