import Api from '../api';
import { createApiThunks } from './utils';

/**
 * Uses a provided utility function to create all thunk actions which dispatch API calls, along with all "child actions"
 * (e.g. "loading", "success", "error" actions).
 */
export const {
    listGalleryItemsThunk,
    createGalleryItemThunk,
    updateGalleryItemThunk,
    deleteGalleryItemThunk
} = createApiThunks(Api);

export const SET_SHOW_ONLY_FAVOURITES = "SET_SHOW_ONLY_FAVOURITES";

export function setShowOnlyFavourites(showOnlyFavourites) {
    return {
        type: SET_SHOW_ONLY_FAVOURITES,
        payload: showOnlyFavourites
    }
}