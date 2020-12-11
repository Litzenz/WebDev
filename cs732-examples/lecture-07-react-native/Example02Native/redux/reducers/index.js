import flexDemoReducer from './flex-demo-reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    flexDemo: flexDemoReducer
});