import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mylocation from '../../../actions/mylocation/mylocation'
import Geocoder from 'react-native-geocoder-reborn'
import { View, Text } from 'react-native'

export default Bottomweather = (props) => {

    const[currentCity,setcurrentCity] = useState('')
    const[wther,setweather] = useState({})
    const[message,setmessage] = useState('')
    const dispatch = useDispatch()
    let city = ''

    useSelector((state)=>{if(state.mylocation.latitude != 0 && message == '') setmessage('Allowed')})

    useEffect(()=>{
        let Geo = {
            lat: props.position.latitude,
            lng: props.position.longitude
        }

        Geocoder.geocodePosition(Geo).then(res => {
            if(message == 'Allowed'){
                position = props.position
                dispatch(mylocation({
                    latitude: position.latitude,
                    longitude: position.longitude,
                    speed: position.speed,
                    heading: position.heading,
                    altitude: position.altitude,
                    altitudeAccuracy: position.altitudeAccuracy,
                    accuracy: position.accuracy,
                    complete: `${res[0].streetName}, ${res[0].locality}, ${res[0].adminArea} ${res[0].postalCode}`,
                    street: res[0].streetName,
                    city: res[0].locality,
                    state: res[0].adminArea,
                    zip: res[0].postalCode,
                    message: 'Allowed'
                }))
                if(currentCity != `${res[0].streetName}, ${res[0].locality}, ${res[0].adminArea} ${res[0].postalCode}`){
                    setcurrentCity(`${res[0].streetName}, ${res[0].locality}, ${res[0].adminArea} ${res[0].postalCode}`)
                    if(res[0].locality != city){
                        city = res[0].locality
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=726db19d90971027a329515b851bfddc`)
                        .then(res => {return res.json()})
                        .then(data => {setweather(data)})
                        .catch(err => console.log('Weather Error: ',err.message))
                    }
                }
            }else{
                setcurrentCity('No Location Info')
            }
        }).catch(err => console.log(err))
    })

    return(
        <View>
            {currentCity != '' ? <View>
                <Text style={{fontSize:20}}>{props.name}</Text>
                <Text>{currentCity}</Text>
                {/* {wther ? console.log(wther):null} */}
            </View> : null}
        </View>
    )
}