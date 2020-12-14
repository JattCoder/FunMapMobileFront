//import { SETTINGS } from '../actions/settings/settings'
//import { SETTINGSUPDATE } from '../actions/settings/settingupdate'
import { LOCSHARE } from '../actions/settings/locShare'
import { BACKCOLOR } from '../actions/settings/backColor'
import { FAMSELECTION } from '../actions/settings/famSelection'

let initialState = {
    user_id: -1,
    drivingMode: 'driving',
    permitted: 'Ghost',
    highways: false,
    tolls: false,
    ferries: false,
    temperature: 'F°',
    backgroundColor: '',
    familySelection: 0,
    result: false,
    message: ''
}

const settings = (settings = initialState, action) => {
    switch(action.type){
        // case SETTINGS:
        //     return action.settings
        // case SETTINGSUPDATE:
        //     return action.settings
        case LOCSHARE:
            return {...settings, permitted: action.settings}
        case BACKCOLOR:
            return {...settings, backgroundColor: action.settings}
        case FAMSELECTION:
            return {...settings, familySelection: action.settings}
        default:
            return settings
    }
}

export default settings