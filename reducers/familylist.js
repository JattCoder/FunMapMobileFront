import { FAMILYLIST } from '../actions/families/family'
import { FAMLIST } from '../actions/family/familylist'

const reducer = (famlist = {}, action) => {
    switch(action.type){
        case FAMLIST:
            return action.famlist
        default:
            return famlist
    }
}

export default reducer