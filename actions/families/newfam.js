import firebase from 'firebase'
import { family } from './family'
export const NEWFAM = 'NEWFAM'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const newfam = (email,name) => {
    
    return (dispatch) => {
        firebase.database().ref('FamilyGroups/').once('value', data => {
            let count = Object.keys(data.val()).length
            firebase.database().ref('FamilyGroups/'+(count+1)+'/').set({
                ID: count+1,
                Message: 'Welcome to '+name,
                Name: name,
                Members: []
            }).then((result)=>{
                //success callback
                //dispatch(family(id))
                firebase.database().ref('FamilyGroups/'+(count+1)+'/Members/'+email.replace(punctuation,'').replace(spaceRE,'')).set({
                    address: '',
                    batteryLevel: 0,
                    charging: false,
                    heading: 0,
                    latitude: 0,
                    locationShare: false,
                    longitude: 0,
                    member: 'Admin',
                    name: '',
                    phone: 0,
                    photo: '',
                    speed: 0
                }).catch(err => console.warn(err))
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
        })
    }
}