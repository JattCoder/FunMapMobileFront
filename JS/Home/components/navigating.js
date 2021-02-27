import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text } from 'react-native'
import FollowPath from './followPath'
import { navigation } from '../../../actions/navigation/navigation'
import polyline from '@mapbox/polyline'
import {SphericalUtil, PolyUtil} from "node-geometry-library"
import inside from 'point-in-polygon'
import * as geolib from 'geolib';

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
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${position.latitude},${position.longitude}&destination=${routeInfo.destination.lat},${routeInfo.destination.lng}&avoid=${routeInfo.avoidHighWays?'highways':''}|${routeInfo.avoidFerries?'ferries':''}|${routeInfo.avoidTolls?'tolls':''}&mode=${routeInfo.drivingMode}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => {return res.json()})
        .then(result => {
            if(result.status === 'ZERO_RESULTS') {
                console.log('No Route')
            }
            else{
                path = []
                completeInfo = {
                    duration: result.routes[0].legs[0].duration.text,
                    durationVal: result.routes[0].legs[0].duration.value,
                    distance: result.routes[0].legs[0].distance.text,
                    steps: []
                }
                result.routes[0].legs[0].steps.map(step => {
                    polyline.decode(step.polyline.points).map(step => {
                        path.push({latitude:parseFloat(step[0]),longitude:parseFloat(step[1])})
                    })
                    completeInfo.steps.push({
                        distance: step.distance.text,
                        duration: step.duration.text,
                        durationVal: step.duration.value,
                        instruction: step.html_instructions,
                        polyline: step.polyline.points
                    })
                })
                dispatch(navigation(true,{pth:path,info:completeInfo,step:completeInfo.steps[0].polyline}))
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

    if(routeInfo.position.latitude != 0 && routeInfo.position.longitude != 0){
        geolib.isPointInLine(
            routeInfo.position,
            routeInfo.path[0],
            routeInfo.path[1]) ? console.warn('were good to go') : console.warn(geolib.getDistanceFromLine(routeInfo.position,routeInfo.path[0],routeInfo.path[1]))

        // inside([position.latitude,position.longitude],props.rInfo.pth.map(stp => {
        //     return [stp.latitude,stp.longitude]
        // })) ? console.warn('Good To Go') : console.warn(props.rInfo)

        // PolyUtil.isLocationOnEdgeOrPath({lat:position.latitude,lng:position.longitude},props.rInfo.pth.map(stp=>{
        //     return [stp.latitude,stp.longitude]
        // },5e-1)) ? console.warn('Good To Go') : console.warn('Re-Route')
    }

    return(
       position.latitude != 0 && position.longitude != 0 ? <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <Text>Hello0000</Text>
            {/* <FollowPath path={routeInfo.path} /> */}
        </View> : null
    )
}