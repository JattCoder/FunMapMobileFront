import { PASSCHANGE } from '../actions/passchange/passchange'
import { PASS_RES } from '../actions/passchange/respasschange'

let initialState = {
    code: '',
    message: '',
    result: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case PASSCHANGE:
            return { ...state, ...action.response }
        case PASS_RES:
            return { ...state, ...action.response }
        default:
            return state
    }
}

export default reducer