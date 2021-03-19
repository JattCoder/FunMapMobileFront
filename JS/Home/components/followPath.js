import React,{ useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Geocoder from 'react-native-geocoder-reborn'
import HtmlText from 'react-native-html-to-text'

export default FollowPath = (props) => {

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
        setRouteInfo(props.info)
    },[props.info])

    console.warn('RouteInfo: ',routeInfo.steps[0])
    return(
        routeInfo.steps.length > 0 ? <View>
            <Text><HtmlText html={routeInfo.steps[0].instruction}/></Text>
        </View> : null
    )
}