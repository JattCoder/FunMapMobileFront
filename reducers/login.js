import { LOGIN } from '../actions/login/login'
import { REGISTER } from '../actions/register/register'
import { LOGIN_RES } from '../actions/login/reslogin'

let initialState = {
    message: {},
    result: false
}

const reducer = (login = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {message: action.message, result: action.result}
        case REGISTER:
            return {message: action.message, result: action.result}
        case LOGIN_RES:
            return {message: action.message, result: action.result}
        default:
            return login
    }
}

export default reducer