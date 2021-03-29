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
                famInfo.members = info.child('Members').val()
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

