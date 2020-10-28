import React from 'react'
import { useDispatch } from 'react-redux'
import { mylocation } from '../../actions/mylocation/mylocation'
import Geolocation from '@react-native-community/geolocation'

export default Location = () =>{

    let id;
    let dispatch = useDispatch()

    success = (pos) => {
        pos = pos.coords
        dispatch(mylocation({
            latitude: pos.latitude,
            longitude: pos.longitude,
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
            message:'Allowed'
        }))
        Geolocation.clearWatch(id);
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
        Geolocation.clearWatch(id);
    }
      
    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 5000
    };
    id = Geolocation.watchPosition(success,error,options)
    console.log('Location ID: ',id)
    return null
}