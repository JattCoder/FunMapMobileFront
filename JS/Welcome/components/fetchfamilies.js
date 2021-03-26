import React,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import firebase from 'firebase'

export default Fetchfamilies = (props) => {

    const dispatch = useDispatch()

    submitFams = () => {
        //dispatch()
    }

    getFamsInfo = () => {
        families = []
        props.fams.map(fam => {
            let famInfo = {id:'',name:'',message:'',members:[]}
            firebase.database().ref('FamilyGroups/'+fam).on('value', info => {
                famInfo.id = fam
                famInfo.name = info.child('Name').val()
                famInfo.message = info.child('Message').val()
                info.child('Members').val().map(member => {
                    mem = []
                    firebase.database().ref('Users/'+member.id).on('value', usr => {
                        famInfo.members.push({
                            name: usr.child('name').val(),
                            battery: usr.child('settings').child('batteryLevel').val(),
                            charging: usr.child('settings').child('charging').val(),
                            location: {
                                address: usr.child('location').child('address'),
                                allowed: usr.child('settings').child('locationShare').val() != 'Ghost' ? true : false,
                                geo: {
                                    latitude: usr.child('location').child('geo').child('latitude').val(),
                                    longitude: usr.child('location').child('geo').child('latitude').val()
                                },
                                heading: usr.child('location').child('heading').val(),
                                speed: usr.child('location').child('speed').val()
                            }
                        })
                    })
                })
                families.push(famInfo)
            })
        })
        console.warn(families)
        //dispatch all families and members 
    }

    useEffect(()=>{
        if(props.fams) getFamsInfo()
    },[props.fams])

    return null
}

