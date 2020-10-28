import React from 'react'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native'

export default UserCard = (props) => {

        return(
            <TouchableOpacity onPress={()=>alert('Pressed '+props.user.name)} style={{width:Dimensions.get('window').width/1.10}}>
                <View style={{flexDirection:'row',marginHorizontal:'7%',marginVertical:'2%',alignItems:'center'}}>
                    <View style={{width:50,height:50}}>
                        {user.photo != '' ? <Image source={{ uri: props.user.image }} /> : <Uimage name={props.user.name} />}
                    </View>
                    <View style={{marginHorizontal:'2%'}}>
                        <Text style={{fontSize:20,color:'white'}}>{props.user.name}</Text>
                        {props.user.permitted == 'Ghost' ? <Text style={{color:'white',width:Dimensions.get('screen').width/1.9}}>Ghost Mode</Text>
                        : <Text style={{color:'white',width:Dimensions.get('screen').width/1.9}}>{props.user.location}</Text>}
                    </View>
                    <View style={{position:'absolute',right:0,width:'10%'}}>
                        { props.user.charging ? <View style={Style.battery}>
                            <Image style={Style.icon} source={require('../../Battery/battery-charging.png')}/>
                            <Text style={Style.level}>{`${props.user.batteryLevel}%`}</Text>
                        </View> 
                        : <View style={Style.battery}>
                            { props.user.batteryLevel < 15 ? <View>
                                <Image style={Style.icon} source={require('../../Battery/battery-zero.png')}/>
                                <Text style={Style.level}>{`${props.user.batteryLevel}%`}</Text>
                            </View>
                            : props.user.batteryLevel < 51 ? <View style={Style.battery}>
                                <Image style={Style.icon}  source={require('../../Battery/battery-25.png')}/>
                                <Text style={Style.level}>{`${props.user.batteryLevel}%`}</Text>
                            </View> 
                            : <View style={Style.battery}>
                                <Image style={Style.icon}  source={require('../../Battery/battery-100.png')}/>
                                <Text style={Style.level}>{`${props.user.batteryLevel}%`}</Text> 
                            </View>}
                        </View>}
                    </View>
                </View>
            </TouchableOpacity>
        )
    
}

const Style = StyleSheet.create({
    battery:{
        justifyContent:'center',
        alignItems:'center',
    },
    icon:{
        height:20,
        width:20
    },
    level:{
        fontSize:10,
        color:'white'
    }
})