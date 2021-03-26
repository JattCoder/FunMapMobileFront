import { MEMBER } from '../actions/famMembers/members'

const members = (mber = [], action) => {
    switch(action.type){
        case MEMBER:
            mber.push(action.member)
            return mber
        default:
            return mber
    }
}

export default members