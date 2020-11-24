import React,{ useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default History = (props) => {

    const[today,setToday] = useState('')
    const[positionList,setPositionList] = useState([])
    const[scheduled,setScheduled] = useState(false)
    const time = (60 * 5) * 1000

    updateDB = () => {
        setScheduled(true)
        setTimeout(()=>{
            sendResults()
        },time)
    }

    sendResults = () => {
        console.warn(positionList)
        //setScheduled(false)
    }
    
    Info = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear();
        td = mm + '/' + dd + '/' + yyyy
        if(today != td) setToday(td)
        setPositionList([...positionList,{date:today,geo:props.current,speed:props.speed}])
        if(!scheduled) updateDB()
    }

    useSelector((state)=>{
        if(state.login.result == false) sendResults()
    })

    useEffect(()=>{
        Info()
    },[props.current])

    return null
}