// import actionTypes from './action-types';

// export const { loadUsersLoading, loadUsersSuccess, loadUsersError } = createApiActions('loadUsers', 'LOAD_USERS');
// export const { loadSingleUserLoading, loadSingleUserSuccess, loadSingleUserError } = createApiActions('loadSingleUser', 'LOAD_SINGLE_USER');
// export const { loadPetsLoading, loadPetsSuccess, loadPetsError } = createApiActions('loadPets', 'LOAD_PETS');

// function createApiActions(actionPrefix, actionTypePrefix) {
//     const actions = {};
//     actions[`${actionPrefix}Loading`] = payload => {
//         type: actionTypes[`${actionTypePrefix}_LOADING`],
//             payload
//     }
//     actions[`${actionPrefix}Success`] = payload => {
//         type: actionTypes[`${actionTypePrefix}_SUCCESS`],
//             payload
//     }
//     actions[`${actionPrefix}Error`] = payload => {
//         type: actionTypes[`${actionTypePrefix}_ERROR`],
//             payload
//     }
//     return actions;
// }