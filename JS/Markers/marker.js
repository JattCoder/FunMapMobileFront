import React from 'react'
import { View, Image } from 'react-native'
import { TouchableOpacity, StyleSheet } from 'react-native'

export default Mrker = (props) =>{
    return(
        <View style={{height:'100%',width:'100%'}}>
            <TouchableOpacity style={{height:'100%',width:'100%'}} onPress={()=>alert('clicked')}>
                {props.place.status == true ? 
                    <Image onPress={()=>alert('ressed')} style={Styles.Icons} source={require('./open_marker.png')} />
                : <Image style={Styles.Icons} source={require('./close_marker.png')} />}
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    Icons:{
        height:30,
        width:25,
    }
})