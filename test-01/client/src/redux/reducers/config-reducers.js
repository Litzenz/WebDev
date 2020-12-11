import { SET_SHOW_ONLY_FAVOURITES } from '../actions';

const DEFAULT_CONFIG_STATE = {
    showOnlyFavourites: false
}

export default function (state = DEFAULT_CONFIG_STATE, action) {
    switch (action.type) {
        case SET_SHOW_ONLY_FAVOURITES:
            return {
                showOnlyFavourites: action.payload
            }
        default:
            return state;
    };
}