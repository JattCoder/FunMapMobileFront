import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native'

export default UserCard = (props) => {

    const [permitted,setPermitted] = useState('Ghost')

    useEffect(()=>{
        //console.warn(props.user.LocationShare)
    })

    // {"Address": null, "Email": "harmandeepmand.hm@gmail.com", "Heading": null, "Latitude": null, "LocationShare": false, "Longitute": null, "Member": "Member", "Name": "Harmandeep Mand", "Phone": "4403171521", "Photo": "", "Speed": null} 

        return(
            <TouchableOpacity onPress={()=>alert('Pressed '+props.user.Name)} style={{width:Dimensions.get('window').width/1.10}}>
                <View style={{flexDirection:'row',marginHorizontal:'7%',marginVertical:'2%',alignItems:'center'}}>
                    <View style={{width:50,height:50}}>
                        {props.user.Photo != '' ? <Image source={{ uri: props.user.Photo }} /> : <Uimage name={props.user.Name} />}
                    </View>
                    <View style={{marginHorizontal:'2%'}}>
                        <Text style={{fontSize:20,color:'#7F7FD5'}}>{props.user.Name}</Text>
                        {!props.user.LocationShare ? <Text style={{color:'#7F7FD5',width:Dimensions.get('screen').width/1.9}}>Ghost Mode</Text>
                        : <Text style={{color:'#7F7FD5',width:Dimensions.get('screen').width/1.9}}>{props.user.Address}</Text>}
                    </View>
                    <View style={{position:'absolute',right:0,width:'10%'}}>
                        { props.user.Charging ? <View style={Style.battery}>
                            <Image style={Style.icon} source={require('../../Battery/battery-charging.png')}/>
                            <Text style={Style.level}>{`${props.user.BatteryLevel}%`}</Text>
                        </View> 
                        : <View style={Style.battery}>
                            { props.user.BatteryLevel < 15 ? <View>
                                <Image style={Style.icon} source={require('../../Battery/battery-zero.png')}/>
                                <Text style={Style.level}>{`${props.user.BatteryLevel}%`}</Text>
                            </View>
                            : props.user.BatteryLevel < 51 ? <View style={Style.battery}>
                                <Image style={Style.icon}  source={require('../../Battery/battery-25.png')}/>
                                <Text style={Style.level}>{`${props.user.BatteryLevel}%`}</Text>
                            </View> 
                            : <View style={Style.battery}>
                                <Image style={Style.icon}  source={require('../../Battery/battery-100.png')}/>
                                <Text style={Style.level}>{`${props.user.BatteryLevel}%`}</Text> 
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
        color:'#7F7FD5'
    }
})