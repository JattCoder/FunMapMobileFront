import { NAVIGATION } from '../actions/navigation/navigation'
import { CLEAR_NAVIGATION } from '../actions/navigation/clearnavigation'

const navigation = (navigation = {active:false,path:[]}, action) => {
    switch(action.type){
        case NAVIGATION:
            return action.navigate
        case CLEAR_NAVIGATION:
            return action.navigate
        default:
            return navigation
    }
}

export default navigation