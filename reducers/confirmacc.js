import { CONFIRMACC } from '../actions/confirmacc/confirm'
import { RESCONFIRM } from '../actions/confirmacc/resconfirm'
import { CONFIRM_CODE } from '../actions/confirmacc/confirmcode'

let initialState = {
    code: '',
    message: '',
    result: false
}

const reducer = (confirmacc = initialState, action) => {
    switch(action.type){
        case CONFIRMACC:
            return { ...confirmacc, ...action.payload }
        case RESCONFIRM:
            return { ...confirmacc, ...action.payload }
        case CONFIRM_CODE:
            console.log('Data: ',action.confirmacc)
            return action.confirmacc
        default:
            return confirmacc
    }
}

export default reducer