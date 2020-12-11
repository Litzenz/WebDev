// import {
//     LOAD_USERS_LOADING, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR,
//     LOAD_SINGLE_USER_LOADING, LOAD_SINGLE_USER_SUCCESS, LOAD_SINGLE_USER_ERROR
// } from '../actions/action-types';
// import actionTypes from '../actions/action-types';
import { loadUsersThunk, loadUserByUsernameThunk } from '../actions/thunks';

export default function users(state = [], action) {
    switch (action.type) {

        case loadUsersThunk.actionTypes.success:
            return users_loadUsersSuccess(state, action);

        case loadUserByUsernameThunk.actionTypes.success:
            return users_loadSingleUserSuccess(state, action);

        default:
            return state;
    }
}

function users_loadUsersSuccess(state, action) {

    const incoming = action.payload;

    const mergedUsers = state.map((user, index) => {

        const match = incoming.find(inc => inc._id === user._id);
        if (match) {
            if (user.registeredPets && user.registeredPets[0]._id) {
                match.registeredPets = user.registeredPets;
            }
            return match;
        }

        return user;
    });

    return mergedUsers.concat(incoming.filter(userA => state.find(userB => userA._id === userB._id) === undefined));
}

function users_loadSingleUserSuccess(state, action) {

    const incoming = action.payload;
    const matchingUser = state.find(u => u._id === incoming._id);

    if (matchingUser) {
        return state.map((oldUser, index) => {
            if (oldUser === matchingUser) {
                return incoming;
            }
            return oldUser;
        })
    }
    else {
        return [...state, incoming];
    }

}