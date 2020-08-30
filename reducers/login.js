import { LOGIN } from '../actions/login/login'
import { LOGIN_RES } from '../actions/login/reslogin'

let initialState = {
    code: '',
    message: '',
    result: false
}

const reducer = (login = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return { ...login, ...action.payload }
        case LOGIN_RES:
            return { ...login, ...action.payload }
        default:
            return login
    }
}

export default reducer