import { NAVIGATION } from '../actions/navigation/navigation'

let initialState = {
    name: '',
    geo: {
        latitude: 0.00,
        longitude: 0.00
    },
    hours: ''
}

const navigate = (navigation = initialState, action) => {
    switch(action.type){
        case NAVIGATION:
            return action.navigation
        default:
            return navigation
    }
}

export default navigate