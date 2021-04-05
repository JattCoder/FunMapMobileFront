import { MARKER } from '../actions/marker/selmarker'
import { CLEARMARKER } from '../actions/marker/clemarker'

let initialState = {
    name: '',
    rating: '',
    placeID: '',
    location:{
        lat: 0.00,
        lng: 0.00,
    },
    formatted_address: '',
    formatted_phone_number: '',
    opening_hours: [],
    open_now: '',
    reviews: '',
    types: ''
}

const marker = (mrker = initialState, action) => {
    switch(action.type){
        case MARKER:
            return action.marker
        case CLEARMARKER:
            return action.marker
        default:
            return mrker
    }
}

export default marker