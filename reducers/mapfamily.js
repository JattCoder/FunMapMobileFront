import { CURRENTFAMILY } from '../actions/mapFamily/currentfamily'

const reducer = (mapfamily = [], action) => {
    switch(action.type){
        case CURRENTFAMILY:
            return action.mapfamily
        default:
            return mapfamily
    }
}

export default reducer