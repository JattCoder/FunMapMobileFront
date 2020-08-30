import { SUBMITSRC } from '../actions/submitsearch/submitsearch'
import { CLEARSRC } from '../actions/submitsearch/clearsearch'

let initialState = []

const reducer = (placesearch = initialState, action) => {
    switch(action.type){
        case SUBMITSRC:
            return action.placesearch
        case CLEARSRC:
            return action.placesearch
        default:
            return placesearch
    }
}

export default reducer