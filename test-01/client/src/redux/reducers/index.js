import { combineReducers } from 'redux';
import galleryItems from './gallery-item-reducers';
import config from './config-reducers';

export default combineReducers({
    galleryItems,
    config
});