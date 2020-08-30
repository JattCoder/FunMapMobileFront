import { REGISTER } from '../actions/register/register'
import { REGISTER_RES } from '../actions/register/resregister'

let initialState = {
    code: '',
    message: '',
    result: false
}

const register = (register = initialState, action) => {
    switch(action.type){
        case REGISTER:
            return { ...register, ...action.response }
        case REGISTER_RES:
            return { ...register, ...action.response }
        default:
            return register
    }
}

export default register