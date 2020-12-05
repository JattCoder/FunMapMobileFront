export const REGISTER = 'REGISTER'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const register = (name,email,phone,photo,password,rec,mac) => {
    return async (dispatch) => {
        await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.database().ref(`Users/`)
            .on('value', snapshot => {
                let count = 0
                for(let key in snapshot.val()) count += 1
                firebase.database().ref(`Users/${email.replace(punctuation, '').replace(spaceRE, ' ')}`).set({
                    name,email,phone,photo,rec,mac,id:count+1
                }).then((data)=>{
                    console.warn('saved')
                    dispatch({type: REGISTER, message: data, result: true})
                    //dispatch the data to global store with success message
                }).catch((error)=>{
                    console.warn('error')
                    dispatch({type: REGISTER, message: {error}, result: false})
                    //dispatcgh to data to global store with error message
                })
            })
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        })
    }
}