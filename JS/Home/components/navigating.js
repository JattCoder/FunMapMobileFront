import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import FollowPath from './followPath'
import { navigation } from '../../../actions/navigation/navigation'
import polyline from '@mapbox/polyline'
import * as geolib from 'geolib'

export default Navigating = (props) => {

    const dispatch = useDispatch()
    const [path,setPath] = useState([])
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

    useEffect(()=>{
        if(path.length || props.rInfo.pth[props.rInfo.pth.length - 1] != routeInfo.destination) setPath(props.rInfo.pth)
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
            path: routeInfo.path.length == 0 ? props.rInfo.pth : routeInfo.path,
            steps: props.rInfo.info.steps
        })
    },[props.position])
    
    replaceValues = () => {
        availablePath = []
        for(let i = 1; i < path.length; i++){
            availablePath.push(path[i]) 
        }
        setPath(availablePath)
    }

    returnNavigatingMessage = () => {
        lastDistance = 0
        
        newDistance = geolib.getDistance(routeInfo.position,routeInfo.path[0])
        
        //newDistance <= 18 ? replaceValues() : lastDistance = newDistance
        return <View style={Styles.frame}>
            <FollowPath info={routeInfo}/>
        </View>
    }

    returnReRouteMessage = () => {
        return <View>
            <TouchableOpacity disabled={true} onPress={setTimeout(()=>{props.reRoute()},5000)}><Text>Re-Routing</Text></TouchableOpacity>
        </View>
    }
    return routeInfo.position.latitude != 0 && routeInfo.position.longitude != 0 ? 
        geolib.isPointInLine(
            routeInfo.position,
            path[0],
            path[1]) || geolib.getDistanceFromLine(routeInfo.position,path[0],path[1]) <= 18 ? returnNavigatingMessage() : returnReRouteMessage()
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