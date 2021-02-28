import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import FollowPath from './followPath'
import { navigation } from '../../../actions/navigation/navigation'
import polyline from '@mapbox/polyline'
import * as geolib from 'geolib'

export default Navigating = (props) => {

    const dispatch = useDispatch()
    const [routeInfo,setRouteInfo] = useState({
        position:{latitude:0,longitude:0},
        drivingMode: 'driving',
        distance: 0,
        destination: {latitude:0,longitude:0},
        avoidHighWays: false,
        avoidTolls: false,
        avoidFerries: false,
        duration: 0,
        path: [],
        steps: []
    })

    reRoute = () => {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${routeInfo.position.latitude},${routeInfo.position.longitude}&destination=${routeInfo.destination.latitude},${routeInfo.destination.longitude}&avoid=${routeInfo.avoidHighWays?'highways':''}|${routeInfo.avoidFerries?'ferries':''}|${routeInfo.avoidTolls?'tolls':''}&mode=${routeInfo.drivingMode}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => {return res.json()})
        .then(result => {
            if(result.status === 'ZERO_RESULTS') {
                console.log('No Route')
            }
            else{
                path = []
                steps = []
                result.routes[0].legs[0].steps.map(step => {
                    polyline.decode(step.polyline.points).map(step => {
                        path.push({latitude:step[0],longitude:step[1]})
                    })
                    steps.push({
                        distance: step.distance.text,
                        duration: step.duration.text,
                        durationVal: step.duration.value,
                        instruction: step.html_instructions,
                        polyline: step.polyline.points
                    })
                })
                setRouteInfo({
                    position:{latitude:routeInfo.position.latitude,longitude:routeInfo.position.longitude},
                    drivingMode: routeInfo.drivingMode,
                    distance: result.routes[0].legs[0].distance.text,
                    destination: {latitude:path[path.length-1].latitude,longitude:path[path.length-1].longitude},
                    avoidHighWays: routeInfo.avoidHighWays,
                    avoidTolls: routeInfo.avoidTolls,
                    avoidFerries: routeInfo.avoidFerries,
                    duration: routeInfo.duration,
                    path,
                    steps
                })
                dispatch(navigation(true,path))
            }
        })
        .catch(err => console.warn('Directions Error: ',err))
    }

    useEffect(()=>{
        setRouteInfo({
            position:{
                latitude:props.position.latitude,
                longitude:props.position.longitude
            },
            drivingMode:routeInfo.drivingMode,
            distance:props.rInfo.info.distance,
            destination:props.rInfo.pth[props.rInfo.pth.length - 1],
            avoidFerries: routeInfo.avoidFerries,
            avoidHighWays: routeInfo.avoidHighWays,
            avoidTolls: routeInfo.avoidTolls,
            duration: props.rInfo.info.duration,
            path: props.rInfo.pth,
            steps: props.rInfo.info.steps
        })
    },[props.position])

    returnNavigatingMessage = () => {
        return <View style={Styles.frame}>
            <FollowPath info={routeInfo}/>
        </View>
    }

    returnReRouteMessage = () => {
        return <View>
            <TouchableOpacity onPress={reRoute()}><Text>Re-Routing</Text></TouchableOpacity>
        </View>
    }

    return routeInfo.position.latitude != 0 && routeInfo.position.longitude != 0 ? 
        geolib.isPointInLine(
            routeInfo.position,
            routeInfo.path[0],
            routeInfo.path[1]) || geolib.getDistanceFromLine(routeInfo.position,routeInfo.path[0],routeInfo.path[1]) <= 4 ? returnNavigatingMessage() : returnReRouteMessage()
    : null
}

const Styles = StyleSheet.create({
    frame:{
        width:'100%',
        height:'50%',
        backgroundColor:'red',
        position:'absolute',
        bottom:0
    }
})