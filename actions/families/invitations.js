export const INVITATIONS = 'INVITATIONS'
import firebase from 'firebase'


export const invitations = (id) => {
    return (dispatch) => {
        firebase.database().ref('Invitations/'+id).on('value',(invitations) => {
            let collection = []
            invitations.forEach((invite)=>{
                collection.push(invite.val())
            })
            return dispatch({type: INVITATIONS, invitations: collection})
        })
    }
}