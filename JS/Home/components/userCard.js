import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native'

export default UserCard = (props) => {

    const [user,setUser] = useState({
        id: '',
        name: '',
        email: '',
        location: '',
        locationShare: false,
        battery: '',
        charging: false,
        member: '',
        photo: ''
    })

    getUserInfo = () => {
        firebase.database().ref('Users/'+props.user.id).on('value', info => {
            setUser({
                id: props.user.id,
                name: info.child('name').val(),
                email: info.child('email').val(),
                location: info.child('location').child('address').val(),
                locationShare: info.child('locationShare').val(),
                battery: info.child('settings').child('batteryLevel').val(),
                charging: info.child('settings').child('charging').val(),
                member: props.user.member,
                photo: info.child('photo').val()
            })
        })
    }

    useEffect(()=>{
        if(props.user.id != '') getUserInfo()
    },[props.user])

        return(
            <TouchableOpacity onPress={()=>alert('Pressed '+props.user.Name)} style={{width:Dimensions.get('window').width/1.10}}>
                <View style={{flexDirection:'row',marginHorizontal:'7%',marginVertical:'2%',alignItems:'center'}}>
                    <View style={{width:50,height:50}}>
                        <Uimage name={user.name} />
                    </View>
                    <View style={{marginHorizontal:'2%'}}>
                        <Text style={{fontSize:20,color:'#7F7FD5'}}>{user.name}</Text>
                        <Text style={{color:'#7F7FD5',width:Dimensions.get('screen').width/1.9}}>{user.locationShare != 'Ghost' ? user.location : 'Ghost'}</Text>
                    </View>
                    <View style={{position:'absolute',right:0,width:'10%'}}>
                        { user.charging ? <View style={Style.battery}>
                            <Image style={Style.icon} source={require('../../Components/bottomweather/batteryIcons/battery-charging.png')}/>
                            <Text style={Style.level}>{`${user.battery}%`}</Text>
                        </View> 
                        : <View style={Style.battery}>
                            { user.battery < 15 ? <View>
                                <Image style={Style.icon} source={require('../../Components/bottomweather/batteryIcons/battery-zero.png')}/>
                                <Text style={Style.level}>{`${user.battery}%`}</Text>
                            </View>
                            : user.battery < 51 ? <View style={Style.battery}>
                                <Image style={Style.icon}  source={require('../../Components/bottomweather/batteryIcons/battery-25.png')}/>
                                <Text style={Style.level}>{`${user.battery}%`}</Text>
                            </View> 
                            : <View style={Style.battery}>
                                <Image style={Style.icon}  source={require('../../Components/bottomweather/batteryIcons/battery-100.png')}/>
                                <Text style={Style.level}>{`${user.battery}%`}</Text> 
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