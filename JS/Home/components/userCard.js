import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { member } from '../../../actions/famMembers/members'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native'

export default UserCard = (props) => {

    const [members,setMembers] = useState([])
    const [user,setUser] = useState({
        name: 'Harmandeep Mand',
        location: 'Home',
        locationShare: true,
        battery: '100',
        charging: false,
        member: 'Member',
        photo: ''
    })
    const dispatch = useDispatch()

    useEffect(()=>{
        if(props.user) memberInfo()
    },[props.user])

    useSelector(state => {
        if(members != state.members) setMembers(state.members),memberInfo()
    })
    //console.warn(props.user)
        return(
            <TouchableOpacity onPress={()=>alert('Pressed '+props.user.Name)} style={{width:Dimensions.get('window').width/1.10}}>
                <View style={{flexDirection:'row',marginHorizontal:'7%',marginVertical:'2%',alignItems:'center'}}>
                    <View style={{width:50,height:50}}>
                        <Uimage name={user.name} />
                    </View>
                    <View style={{marginHorizontal:'2%'}}>
                        <Text style={{fontSize:20,color:'#7F7FD5'}}>{user.name}</Text>
                        <Text style={{color:'#7F7FD5',width:Dimensions.get('screen').width/1.9}}>{user.location}</Text>
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