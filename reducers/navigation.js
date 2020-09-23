import { NAVIGATION } from '../actions/navigation/navigation'

let initialState = {
    stops: [],
    destination: [],
    status: ''
}

const navigation = (navigation = initialState, action) => {
    switch(action.type){
        case NAVIGATION:
            return action.navigate
        default:
            return navigation
    }
}

export default navigation