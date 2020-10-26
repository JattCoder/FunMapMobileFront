import { INVITATIONS } from '../actions/families/invitations'

const reducer = (invitations = [], action) => {
    switch(action.type){
        case INVITATIONS:
            return action.invitations
        default:
            return invitations
    }
}

export default reducer