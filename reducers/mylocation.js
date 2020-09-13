import { MYLOCATION } from '../actions/mylocation/mylocation'

let initialState = {
    latitude: 0,
    longitude: 0,
    speed: 0,
    heading: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    accuracy: 0
}

const mylocation = (mylocation = initialState, action) => {
    switch(action.type){
        case MYLOCATION:
            return action.mylocation
        default:
            return mylocation
    }
}

export default mylocation