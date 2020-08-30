import { MYLOCATION } from '../actions/mylocation/mylocation'

let initialState = {
    latitude: 0,
    longitude: 0,
    speed: 0,
    heading: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    accuracy: 0,
    received: false
}

const mylocation = (mylocation = initialState, action) => {
    switch(action.type){
        case MYLOCATION:
            return { ...mylocation, ...action.payload }
        default:
            return mylocation
    }
}

export default mylocation