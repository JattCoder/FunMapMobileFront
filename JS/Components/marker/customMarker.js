import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default CustomMarker = (props) => {
    return(
        <TouchableOpacity onPress={()=>alert(props.place.name)} activeOpacity={1} style={Styles.Marker}>
            <Image style={{width:40,height:40}} source={require('../../Markers/marker.png')} />
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    Marker: {
        width:30,
        height:50,
    }
})