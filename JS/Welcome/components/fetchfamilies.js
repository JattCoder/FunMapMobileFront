import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux'
import firebase from 'firebase'
import { family } from '../../../actions/families/family'

export default Fetchfamilies = (props) => {

    const dispatch = useDispatch()

    submitFams = (fams) => {
        dispatch(family(fams))
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
                        usrinfo = {
                            id: member.id,
                            name: usr.child('name').val(),
                            battery: usr.child('settings').child('batteryLevel').val(),
                            charging: usr.child('settings').child('charging').val(),
                            member: member.member,
                            photo: usr.child('photo').val(),
                            location: {
                                address: usr.child('settings').child('locationShare').val() != 'Ghost' ? usr.child('location').child('address').val() : 'Ghost',
                                allowed: usr.child('settings').child('locationShare').val() != 'Ghost' ? true : false,
                                geo: {
                                    latitude: usr.child('location').child('geo').child('latitude').val(),
                                    longitude: usr.child('location').child('geo').child('latitude').val()
                                },
                                heading: usr.child('location').child('heading').val(),
                                speed: usr.child('location').child('speed').val()
                            }
                        }
                        famInfo.members.length > 0 ? famInfo.members.map(member => {
                            if(member.id != usr.child('id').val()) famInfo.members.push(usrinfo)
                        }) : famInfo.members.push(usrinfo)
                    })
                })
                families.push(famInfo)
            })
        })
        submitFams(families)
    }

    useEffect(()=>{
        if(props.fams) getFamsInfo()
    },[props.fams])

    return null
}

