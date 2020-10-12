import { FAMILY } from '../actions/login/login'

let initialState = {
    admin_id: '',
    name:'',
    code:'',
    admins:'',
    users:'',
    created_at:'',
    date:''
}

const reducer = (family = initialState, action) => {
    switch(action.type){
        case FAMILY:
            return action.family
        default:
            return family
    }
}

export default reducer