import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { mylocation } from '../../actions/mylocation/mylocation'
import Geolocation from '@react-native-community/geolocation'

export default Location = (props) =>{

    const dispatch = useDispatch()
    let id = ''

    updateLocation = (pos) => {
        dispatch(mylocation({
            latitude: pos.latitude,
            longitude: pos.longitude,
            speed: pos.speed,
            heading: pos.heading,
            altitude: pos.heading,
            altitudeAccuracy: pos.altitudeAccuracy,
            accuracy: pos.accuracy,
            message:'Allowed'
        }))
        Geolocation.clearWatch(id)
    }

    success = (pos) => {
        if(pos.coords.speed <= 1 || pos.coords.speed >= -1)
            updateLocation(pos.coords)
    }
      
    error = (err) => {
        dispatch(mylocation({
            latitude: 0,
            longitude: 0,
            speed: 0,
            heading: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            accuracy: 0,
            complete: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            permitted: '',
            message: err.message
        }))
    }
      
    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 5000
    };
    id = Geolocation.watchPosition(success,error,options)
    return null
}