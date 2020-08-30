import React,{ useState } from 'react'
import Geolocation from '@react-native-community/geolocation'

export const Myposition = (prev) => {
    const [coords, setcoords] = useState({})
    Geolocation.getCurrentPosition(position => {
        setcoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            heading: position.coords.heading,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            accuracy: position.coords.accuracy,
            received: true
        })
    },err => alert(err))
    return coords
}