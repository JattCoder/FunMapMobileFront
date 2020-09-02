import React from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default Displaycard = (props) => {
    return(
        <View style={Styles.Card}>
            <View style={{flexDirection:'row'}}>
                <View style={{width:'80%'}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row',height:30,width:'75%'}}>
                            <Image style={{height:20,width:20}} source={{uri:props.item.icon}}/>
                            <Text style={{paddingHorizontal:10,fontSize:16}}>{props.item.name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize:11,width:'80%'}}>{props.item.address}</Text>
                    </View>
                </View>
                <View style={{width:'25%'}}>
                    <View>
                        {props.item.status == true ? 
                        <Text style={{fontSize:10,color:'green'}}>Open</Text> : <Text style={{fontSize:10,color:'red'}}>Closed</Text>}
                    </View>
                    <View style={{marginTop:'30%'}}>
                        <Text style={{fontSize:10}}>10 Miles</Text>
                        <Text style={{fontSize:10}}>20 Minutes</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{width:'100%',borderWidth:0.4,marginTop:20,borderColor:'rgba(0,0,0,0.2)'}}/>
        </View>
    )
}

const Styles = StyleSheet.create({
    Card:{
        height:120,
        width:300,
        padding:20,
    },
    Name:{
        fontSize:10
    }
})