import { listGalleryItemsThunk, createGalleryItemThunk, updateGalleryItemThunk, deleteGalleryItemThunk } from '../actions';
import moment from 'moment';

/**
 * Applies the given action to the given todo-list state, if applicable.
 * 
 * @param state the current list of todo items in the store
 * @param action the action to apply to the store
 */
export default function (state = [], action) {
    switch (action.type) {
        case listGalleryItemsThunk.actionTypes.success:
            return listItemsSuccess(state, action.payload);

        case createGalleryItemThunk.actionTypes.success:
            return createItemSuccess(state, action.payload);

        case updateGalleryItemThunk.actionTypes.success:
            return updateItemSuccess(state, action.payload);

        case deleteGalleryItemThunk.actionTypes.success:
            return deleteItemSuccess(state, action.payload);

        default:
            return state;
    }
}

/**
 * Returns a new list created by merging the old list and the one contained within the given payload.
 * 
 * The merged list will contain all items from both lists, except in the case where more than one item has the same id.
 * In that case, the incoming item will be kept, and the other discarded.
 * 
 * @param oldState the old list
 * @param payload  the list to merge with the old one
 */
function listItemsSuccess(oldState, payload) {
    // Create a new array, where, foreach item in the existing array...
    const mergedItems = oldState.map((item) => {

        // If an incoming item has the same id as the todo at this index...
        const match = payload.find(inc => inc._id === item._id);
        if (match) {
            // substitute the incoming item
            return match;
        }

        // Otherwise, keep the current item
        return item;
    });

    // Now, add all the incoming items which have different ids
    return mergedItems.concat(payload.filter(itemA => oldState.find(itemB => itemA._id === itemB._id) === undefined));
}

/**
 * Returns a new array consisting of all items in the old list, plus the new item in the given payload.
 * 
 * @param oldState the old list
 * @param payload the single item to add to the list
 */
function createItemSuccess(oldState, payload) {
    return [
        ...oldState,
        payload
    ];
}

/**
 * Returns a new array consisting of all items in the old list, except the one with an _id matching the given payload.
 * That item will be replaced by the item from the payload.
 * 
 * @param oldState the old list
 * @param payload the single item to add to the list
 */
function updateItemSuccess(oldState, payload) {
    return oldState.map(oldItem => {
        if (payload._id === oldItem._id) {
            return payload;
        }
        else {
            return oldItem;
        }
    });
}

/**
 * Returns a new array consisting of all items in the old list, except the one with an _id matching the given payload.
 * 
 * @param oldState the old list
 * @param payload the id of the item that's been removed
 */
function deleteItemSuccess(oldState, payload) {
    return oldState.filter(item => item._id !== payload);
}