import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { getBatteryLevel, isBatteryCharging } from 'react-native-device-info'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export default Checkbattery = (props) => {

    const [email,setEmail] = useState('')
    const [fams,setFams] = useState([])

    getInfo = () => {
        getBatteryLevel().then(level => {
            isBatteryCharging().then(charging => {
                console.warn('Battery check')
                for(let fam in fams){
                    firebase.database().ref('FamilyGroups/'+fams[fam].ID+'/Members/'+email.replace(punctuation,'').replace(spaceRE,'')).update({
                        batteryLevel: level*100,
                        charging
                    })
                }
            })
        })
    }

    useEffect(()=>{
        setEmail(props.email)
        //unblock next line to get battery info
        //getInfo()
    },[])

    useSelector((state)=>{
        if(fams != state.family){
            setFams(state.family)
        }
    })

    return null
}