import { SET_JUSTIFY_CONTENT, SET_ALIGN_ITEMS, SET_FLEX_DIRECTION } from "../action-types";

const INITIAL_STATE = { fdIndex: 0, aiIndex: 0, jcIndex: 0 };

export default function flexDemoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_JUSTIFY_CONTENT:
            return { ...state, jcIndex: action.payload };

        case SET_ALIGN_ITEMS:
            return { ...state, aiIndex: action.payload };

        case SET_FLEX_DIRECTION:
            return { ...state, fdIndex: action.payload };

        default:
            return state;
    }
}