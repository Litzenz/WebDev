import { combineReducers } from 'redux'
import {AUTH_SUCCESS, ERROR_MSG} from '../redux/action-types'

const initUser = {
    redirectTo:'',
    username:'',
    msg: '',
    isLogin: false
}

function user(state=initUser, action) {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...action.data, redirectTo:'/creatRoom'}
        case ERROR_MSG:
            return {...state, msg: action.data}
        default:
            return state
    }

}

export default combineReducers({
    user
});