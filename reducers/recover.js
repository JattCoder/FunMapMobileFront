import { ACCOUNT } from '../actions/recover/account'
import { ACCOUNT_RES } from '../actions/recover/resaccount'
import { PIN } from '../actions/recover/pin'
import { CONFIRM_PIN } from '../actions/recover/confirmpin'

let initialState = {
    code: '',
    message: '',
    result: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ACCOUNT:
            return { ...state, ...action.response }
        case ACCOUNT_RES:
            return { ...state, ...action.response }
        case PIN:
            return { ...state, ...action.response }
        case CONFIRM_PIN:
            return { ...state, ...action.response }
        default:
            return state
    }
}

export default reducer