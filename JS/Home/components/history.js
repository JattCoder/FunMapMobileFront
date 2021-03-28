import React,{ useEffect, useState } from 'react'
import firebase from 'firebase'
import polyline from '@mapbox/polyline'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export default History = (props) => {

    const[positionList,setPositionList] = useState([])
    const[id,setId] = useState('')
    const[todaY,setToday] = useState({
        string:'',
        timestamp:0
    })
    const time = (60 * 5) * 1000

    updateDB = () => {
        setTimeout(()=>{
            sendResults()
        },time)
    }

    sendResults = () => {
        firebase.database().ref('History/'+id+'/'+todaY.string).set({
            positionList: polyline.encode(positionList)
        })
        .catch(err => console.warn(err))
    }
    
    Info = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear();
        td = mm + '-' + dd + '-' + yyyy
        if(todaY.string != td) setToday({string:td, timestamp:today})
        if(id != '' && props.current.lat != 0 && props.current.lng != 0){
            setPositionList([...positionList,[props.current.lat,props.current.lng]])
            setTimeout(()=>{sendResults()},20000)
        }
    }

    useEffect(()=>{
        if(props.id && props.current.lat != 0 && props.current.lng != 0){
            setId(props.id)
            Info()
        }
    },[props.current])

    return null
}