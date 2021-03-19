import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
export const LOGIN = 'LOGIN'

export const login = (email,pass,mac) => {
    return (dispatch) => {
        let punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
        let spaceRE = /\s+/g
        auth()
        .signInWithEmailAndPassword(email,pass)
        .then((usr)=>{
            firebase.database().ref(`Users/`+email.replace(punctuation,'').replace(spaceRE,''))
            .on('value', snapshot => {
                if(snapshot.val().mac == mac) dispatch({type: LOGIN, message: snapshot, result: true})
                else dispatch({type: LOGIN, message: {error: 'Please Logout from other device first '}, result: false})
            })
        })
        .catch((err)=>{
            if(err.code === 'auth/wrong-password'){
                console.warn('Incorrect Password')
            }else if(err.code === 'auth/user-not-found'){
                console.warn('Account Not Found')
            }else if(err.code === 'auth/invalid-email'){
                console.warn('Invalid Email')
            }
        })
    }
}