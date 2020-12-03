export const INVITATIONS = 'INVITATIONS'
import firebase from 'firebase'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const invitations = (email) => {
    return (dispatch) => {
        firebase.database().ref('Invitations/'+email.replace(punctuation,'').replace(spaceRE,'')).on('value',(invitations) => {
            let collection = []
            for(let invitation in invitations.val()){
                console.warn(invitations[invitation])
            }
            return dispatch({type: INVITATIONS, invitations: collection})
        })
    }
}