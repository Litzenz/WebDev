import { SET_JUSTIFY_CONTENT, SET_ALIGN_ITEMS, SET_FLEX_DIRECTION } from "./action-types";

export function setJustifyContent(value) {
    return { type: SET_JUSTIFY_CONTENT, payload: value }
}

export function setAlignItems(value) {
    return { type: SET_ALIGN_ITEMS, payload: value }
}

export function setFlexDirection(value) {
    return { type: SET_FLEX_DIRECTION, payload: value }
}