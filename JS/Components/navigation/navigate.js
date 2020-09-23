import React,{ useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { navigation } from '../../../actions/navigation/navigation'
import { useSelector, useDispatch } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions'

export default Navigate = () => {

    const OK = 'OK'
    const NOT_FOUND = 'NOT_FOUND'
    const ZERO_RESULTS = 'ZERO_RESULTS'
    const dispatch = useDispatch()
    const [navigation,setnavigation] = useState({
        origin:{
            latitude: 0.00,
            longitude: 0.00
        },
        destination:{},
        stops:[],
        status: ''
    })
    // const [navigate,setnavigate] = useState({
    //     origin: {lat:props.currentLocaiton.latitude,lng:props.currentLocaiton.longitude},
    //     destination: {lat:props.destination.latitude,lng:props.destination.longitude}
    // })
    getDirections = async () => {
        await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${navigate.origin.latitude,navigate.origin.longitude}&destination=${navigation.destination.lat,navigation.destination.lng}&mode=driving&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => {return res.json()})
        .then(data => {
            if(data.geocoded_waypoints.status == OK){
                console.warn('received directions')
                console.log(data)
                dispatch(navigation(navigate.stops,[navigation.destination.lat,navigation.destination.lng],navigation.status))
            }else if(data.geocoded_waypoints.status == NOT_FOUND){
                dispatch(navigation(navigate.stops,[navigation.destination.lat,navigation.destination.lng],'Location Error!'))
            }else if(data.geocoded_waypoints.status == ZERO_RESULTS){
                dispatch(navigation(navigate.stops,[navigation.destination.lat,navigation.destination.lng],'No Route!'))
                //no routes found to selected destination
            }else{
                dispatch(navigation(navigate.stops,[navigation.destination.lat,navigation.destination.lng],'Network Error!'))
                //network issue
            }
        })
        .catch(err => console.warn(err.message))
    }

    useSelector((state)=>{
        if(state.navigation.destination.length > 0 && state.navigation.status == ''){
            setnavigation({
                origin:{
                    latitude: state.mylocation.latitude,
                    longitude: state.mylocation.longitude
                },
                destination: state.marker,
                stops: state.navigation.stops,
                status: 'Ready'
            })
            //getDirections()
        }
    })

    return(
        <View>
            <Text>Hello</Text>
        </View>
    )
}
