import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { getBatteryLevel, isBatteryCharging } from 'react-native-device-info'
import { View } from 'react-native'

export default Checkbattery = () => {

    const [id,setId] = useState(0)
    const [fams,setFams] = useState([])

    getInfo = () => {
        getBatteryLevel().then(level => {
            isBatteryCharging().then(charging => {
                fams.map((fam)=>{
                    firebase.database().ref(`FamilyGroups/${fam[0].id}/${id}`).update({
                        batteryLevel: level*100,
                        charging
                    })
                })
            })
        })
    }

    useEffect(()=>{
        //getInfo()
    })

    useSelector((state)=>{
        // if(fams != state.family){
        //     setId(state.login.message.id)
        //     setFams(state.family)
        // }
    })

    return null
}