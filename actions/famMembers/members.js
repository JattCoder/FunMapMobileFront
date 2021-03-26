export const MEMBER = 'MEMBER'

import firebase from 'firebase'

export const member = (info) => {
    return (dispatch) => {
        firebase.database().ref('Users/'+info.id).on('value', usr =>{
            mber = {
                name: usr.child('name').val(),
                location: usr.child('settings').child('locationShare').val() != 'Ghost' ? usr.child('location').child('address').val() : 'Ghost',
                locationShare: usr.child('settings').child('locationShare').val(),
                battery:usr.child('settings').child('batteryLevel').val(),
                charging:usr.child('settings').child('charging').val(),
                member:info.member,
                photo: usr.child('photo').val()
            }
            return dispatch({type: MEMBER, member: mber})
        })
    }
}