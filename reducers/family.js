import { FAMILY } from '../actions/families/family'
import { NEWFAM } from '../actions/families/newfam'
import { REMOVEFAM } from '../actions/families/removefam'

const reducer = (family = [], action) => {
    switch(action.type){
        case FAMILY:
            return action.family
        case NEWFAM:
            family.push(action.fam)
            return family
        case REMOVEFAM:
            return action.family
        default:
            return family
    }
}

export default reducer