import { MYLOCATION } from '../actions/mylocation/mylocation'
import { UPDATESHARE } from '../actions/mylocation/updateshare'

let initialState = {
    latitude: 0,
    longitude: 0,
    speed: 0,
    heading: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    accuracy: 0,
    permitted: false,
}

const mylocation = (mylocation = initialState, action) => {
    switch(action.type){
        case MYLOCATION:
            return action.mylocation
        case UPDATESHARE:
            return {...mylocation, permitted: action.updateshare}
        default:
            return mylocation
    }
}

export default mylocation