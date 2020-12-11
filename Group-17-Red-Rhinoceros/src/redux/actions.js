import {reqRegister, reqSignin} from '../api'
import {AUTH_SUCCESS, ERROR_MSG} from './action-types'

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type:ERROR_MSG, data: msg})

export const register = (user) => {

    return async dispatch => {
        const response = await reqRegister(user)
        const result = response.data
        console.log(result)
        if(result.code===0) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }

    }
}

export const signin = (user) => {

    return async dispatch => {
        const response = await reqSignin(user)
        const result = response.data
        if(result.code===0) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }


    }
}