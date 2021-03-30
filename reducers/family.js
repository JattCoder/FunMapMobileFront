import { FAMILY } from '../actions/families/family'
import { NEWFAM } from '../actions/families/newfam'
import { REMOVEFAM } from '../actions/families/removefam'

const reducer = (family = [], action) => {
    switch(action.type){
        case FAMILY:
            return action.family
        case NEWFAM:
            newGroup = {
                id: action.key,
                name: action.fam.Name,
                message: action.fam.Message,
                members: action.fam.Members,
                getTogether: action.fam.GetTogether,
                settings: action.fam.Settings
            }
            family.push(newGroup)
            return family
        default:
            return family
    }
}

export default reducer