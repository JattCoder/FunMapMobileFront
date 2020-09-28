import React from 'react'
import Geocoder from 'react-native-geocoder-reborn'

export default Locationame = (props) => {
    let Geo = {
        lat: props.latitude,
        lng: props.longitude
    };
    Geocoder.geocodePosition(Geo).then(res => {
        return res
    })
    .catch(err => console.log(err))
}