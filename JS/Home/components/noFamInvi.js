import React from 'react'
import { View, Dimensions, Animated, Text } from 'react-native'

export default NoFamInvi = (props) => {
    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
            <Animated.View style={{width:Dimensions.get('screen').width/1.07,height:Dimensions.get('screen').height/1.97,justifyContent:'center',alignContent:'center',shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(211,204,227,1)',borderRadius:10,alignItems:'center'}}>
                <Text style={{color:'#7F7FD5',fontSize:15}}>No {props.message}</Text>
            </Animated.View>
        </View>
    )
}