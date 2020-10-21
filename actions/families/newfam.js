import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { family } from './family'
export const NEWFAM = 'NEWFAM'

export const newfam = (id,email,name,uname) => {
    
    return (dispatch) => {
            fetch(`http://localhost:3000/account/new_family`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id,email,name})
            })
            .then(res => {return res.json()})
            .then(data => {
                firebase.database().ref('FamilyGroups/'+data.message.id+'/'+id).set({
                    name: uname,
                    location: '',
                    charging: false,
                    batteryLevel: 0,
                    permitted: 'Ghost',
                    latitude: 0,
                    longitude: 0,
                    speed: 0,
                    heading: 0,
                    action: '',
                    navigation: ''
                }).then((result)=>{
                    //success callback
                    dispatch(family(id))
                }).catch((error)=>{
                    //error callback
                    console.log('error ' , error)
                })
            })
            .catch(err => console.log(err))
    }
}