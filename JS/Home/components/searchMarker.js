import React,{ useEffect, useState } from 'react'
import { Image, Animated, View } from 'react-native'
import { useSelector } from 'react-redux'

export default SearchMarker = (props) => {

    const [markerSize] = useState(new Animated.Value(35))
    const [markerID,setMarkerID] = useState('')
    const [selectedMarker,setSelectedMarker] = useState('')

    useSelector(state => {
        if(state.marker.placeID != '' && selectedMarker == '') setSelectedMarker(state.marker.placeID)
        else if(state.marker.placeID == '' && selectedMarker != '') setSelectedMarker('')
    })
    return(
        selectedMarker != '' && props.plc.placeID == selectedMarker ?
            <Animated.View style={{height:markerSize,width:markerSize}}>
                <Image style={{height:'100%',width:'100%',position:'absolute'}} source={require('../../settingsIcons/searchMarker.png')}/>
                <View style={{height:'90%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{height:14,width:14}} source={{uri: props.plc.icon}}/>
                </View>
            </Animated.View>
        : selectedMarker != '' ? <Animated.View style={{height:markerSize,width:markerSize}}>
            <Image style={{height:'100%',width:'100%',position:'absolute'}} source={require('../../settingsIcons/searchMarker.png')}/>
            <View style={{height:'90%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <Image style={{height:14,width:14}} source={{uri: props.plc.icon}}/>
            </View>
        </Animated.View> : null
    )
}