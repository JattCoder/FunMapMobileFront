import firebase from 'firebase'
import { family } from './family'
export const NEWFAM = 'NEWFAM'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const newfam = (id,email,name,fams = []) => {
    
    return (dispatch) => {
        fam = {
            Message: 'Welcome to '+name,
            Name: name,
            Members: [{id,member:'Admin'}],
            GetTogether: [],
            Settings:{}
        }
        firebase.database().ref('FamilyGroups/').push(fam).then((result)=>{
            return result.toJSON()
        }).then(resp => {
            key = resp.replace('https://maps-8a2af.firebaseio.com/FamilyGroups/','')
            fams.push(key)
            firebase.database().ref('Users/'+email.replace(punctuation,'').replace(spaceRE,'')).update({
                families: fams
            }).then(res => {
                dispatch({type:NEWFAM,fam})
            })
            .catch(err => console.warn(err))
        })
        .catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }
}