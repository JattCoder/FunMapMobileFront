import firebase from 'firebase'
import { family } from './family'
export const NEWFAM = 'NEWFAM'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const newfam = (email,name,Uname,phone,photo) => {
    
    return (dispatch) => {
        let count = 0
        firebase.database().ref('FamilyGroups/').orderByKey().limitToLast(1).once('value',snap=>{
            for(let i in snap.val()){
                count = i
            }
            firebase.database().ref('FamilyGroups/'+(parseInt(count)+1)+'/').set({
                ID: count+1,
                Message: 'Welcome to '+name,
                Name: name,
                Members: []
            }).then((result)=>{
                firebase.database().ref('FamilyGroups/'+(parseInt(count)+1)+'/Members/'+email.replace(punctuation,'').replace(spaceRE,'')).set({
                    address: '',
                    email,
                    batteryLevel: 0,
                    charging: false,
                    heading: 0,
                    latitude: 0,
                    locationShare: false,
                    longitude: 0,
                    member: 'Admin',
                    name: Uname,
                    phone: phone,
                    photo: photo,
                    speed: 0
                }).catch(err => console.warn(err))
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
        })
    }
}