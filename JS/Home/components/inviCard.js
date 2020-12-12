import React from 'react'
import { View, Dimensions, Animated } from 'react-native'

export default InviCard = () => {
    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
            <Animated.View style={{opacity:1,width:Dimensions.get('screen').width/1.07,height:Dimensions.get('screen').height/1.97,shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(211,204,227,1)',borderRadius:10,alignItems:'center'}}>
                
            </Animated.View>
        </View>
    )
}