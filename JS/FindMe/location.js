import React from 'react'
import { useDispatch } from 'react-redux'
import { mylocation } from '../../actions/mylocation/mylocation'
import Geolocation from '@react-native-community/geolocation'

export default Location = () =>{

    let id;
    let dispatch = useDispatch()

    success = (pos) => {
        dispatch(mylocation(pos.coords))
        Geolocation.clearWatch(id);
    }
      
    error = (err) => {
        console.log('ERROR(' + err.code + '): ' + err.message);
    }
      
    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 5000
    };

    id = Geolocation.watchPosition(success,error,options)
    return null
}