import { BOTTOMSHEET } from '../actions/animation/bottomsheet'

const initialState = {
    type: '',//Family & Settings or Marker Selection
    height: 0,
    result: true
}

const reducer = (sheet = initialState, action) => {
    switch(action.type){
        case BOTTOMSHEET:
            return action.sheet
        default:
            return sheet
    }
}

export default reducer