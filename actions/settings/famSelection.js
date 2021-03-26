export const FAMSELECTION = 'FAMSELECTION'
import firebase from 'firebase'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const famselection = (id,famSelection) => {
    return async (dispatch) => {
        firebase.database().ref('Users/'+id+'/settings').update({
            famSelection
        }).catch(err => {
            console.warn(err)
        })
        dispatch({type: FAMSELECTION, settings: famSelection})
    }
}