import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default CustomMarker = (props) => {
    //add animation.. vibrate the head of marker, only markers that are green (open places)
    return(
        <View activeOpacity={1} style={Styles.Marker}>
            <View style={{position:'absolute'}}>
                {props.place.status == true ? <Image style={{width:30,height:30}} source={require('../../Markers/open_marker.png')} /> :
                <Image style={{width:30,height:30}} source={require('../../Markers/close_marker.png')} />}
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    Marker: {
        width:30,
        height:60,
    },
})