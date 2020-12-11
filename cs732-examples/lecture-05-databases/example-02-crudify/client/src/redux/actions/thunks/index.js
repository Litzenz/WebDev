import Api from '../../../api';
import createApiThunk from './thunk-helper';

export const loadUsersThunk = createApiThunk('loadUsers', Api.getUsers);
export const loadUserByUsernameThunk = createApiThunk('loadUserByUsername', Api.getUserByUsername);