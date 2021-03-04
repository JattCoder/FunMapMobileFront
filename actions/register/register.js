export const REGISTER = 'REGISTER'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const register = (name,email,phone,photo,password,mac) => {
    return async (dispatch) => {
        await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((ur) => {
            firebase.database().ref(`Users/`)
            .once('value', snapshot => {
                let count = 0
                for(let key in snapshot.val()) count += 1
                firebase.database().ref(`Users/${email.replace(punctuation, '').replace(spaceRE, ' ')}`).set({
                    drivingMode:'driving',
                    famSelection:'',
                    ferries:false,
                    highways:false,
                    home:'',
                    km:'miles',
                    locationShare:false,
                    member_type:'trial',
                    temperature:'C°',
                    tolls:false,
                    name,
                    email,
                    phone,
                    photo,
                    mac,
                    id:ur.user.uid,
                    since:new Date().getTime()
                }).then((data)=>{
                    console.warn('saved')
                    dispatch({type: REGISTER, message: data, result: true})
                    //dispatch the data to global store with success message
                }).catch((error)=>{
                    console.warn(error)
                    dispatch({type: REGISTER, message: error, result: false})
                    //dispatcgh to data to global store with error message
                })
            })
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                dispatch({type: REGISTER, message: {error:'Email is already in use!'}, result: false})
            }else if (error.code === 'auth/invalid-email') {
                dispatch({type: REGISTER, message: {error:'Invalid Email'}, result: false})
            }
        })
    }
}