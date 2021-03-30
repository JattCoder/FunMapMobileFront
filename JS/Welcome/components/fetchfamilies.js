import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux'
import firebase from 'firebase'
import { family } from '../../../actions/families/family'

export default Fetchfamilies = (props) => {

    const dispatch = useDispatch()

    submitFams = (fams) => {
        setTimeout(()=>dispatch(family(fams)),500)
    }

    getFamsInfo = () => {
        families = []
        props.fams.map(fam => {
            let famInfo = {id:'',name:'',message:'',members:[],getTogether:[],settings:{}}
            firebase.database().ref('FamilyGroups/'+fam).on('value', info => {
                famInfo.id = fam
                famInfo.name = info.child('Name').val()
                famInfo.message = info.child('Message').val()
                famInfo.members = info.child('Members').val()
                famInfo.getTogether = info.child('GetTogather').val() ? info.child('GetTogather').val() : []
                famInfo.settings = info.child('Settings').val() ? info.child('Settings').val() : {}
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

