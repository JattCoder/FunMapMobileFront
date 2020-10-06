import React,{ useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import Account from '../Components/settings/account'
import Navigation from '../Components/settings/navigation'

export default Setting = (props) => {

    const [actionType,setActionType] = useState('')

    const colors = {
        select: '#3498DB',
        unselect: 'white'
    }
    //Miles - Kilometer
    const [milesColor,setMilesColor] = useState(colors.select)
    const [milesTextColor,setMilesTextColor] = useState(colors.unselect)
    const [kilometerColor,setKilometerColor] = useState(colors.unselect)
    const [kilometerTextColor,setKilometerTextColor] = useState(colors.select)
    const [uSelection,setUSelection] = useState('')

    //Temperature
    const [fColor,setFColor] = useState(colors.select)
    const [fTextColor,setFTextColor] = useState(colors.unselect)
    const [cColor,setCColor] = useState(colors.unselect)
    const [cTextColor,setCTextColor] = useState(colors.select)
    const [kColor,setKColor] = useState(colors.unselect)
    const [kTextColor,setKTextColor] = useState(colors.select)
    const [tSelection,setTSelection] = useState('')

    //optimize to reorder the waypoints to decrese the time
    //&waypoints=optimize:true|San Francisco|Miami,FL
    //&waypoints=via:-37.81223%2C144.96254%7Cvia:-34.92788%2C138.60008
    //avoid=tolls|highways|ferries
    //units=metric (Kilometer) or imperial (miles)
    //Navigation
    const drivingModes = {
        Bycycling: 'bicycling',
        Driving: 'driving',
        Transit: 'transit',
        Walking: 'walking'
    }
    const avoid = {
        Highways: 'highways',
        Tolls: 'tolls',
        Ferries: 'ferries'
    }

    const dispatch = useDispatch()

    

    //getting user information via props -> props.user
    return(
        actionType == '' ? <View style={{marginTop:'-5%',height:'135%',width:'100%',alignItems:'center'}}>
        <View style={{height:'10%',width:'100%',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{setActionType('Account')}} style={{width:'80%',height:'100%',justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{height:30,width:30}} source={require('../settingsIcons/account.png')}/>
                    <Text style={{left:10,fontSize:15}}>Account</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0.5,borderColor:'#808080',width:'75%',marginVertical:'3%'}}/>
            <TouchableOpacity onPress={()=>{setActionType('Navigation')}} style={{width:'80%',height:'100%',justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{height:30,width:30}} source={require('../settingsIcons/navigation.png')}/>
                    <Text style={{left:10,fontSize:15}}>Navigation</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0.5,borderColor:'#808080',width:'75%',marginVertical:'3%'}}/>
            <TouchableOpacity onPress={()=>{setActionType('Weather')}} style={{width:'80%',height:'100%',justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{height:30,width:30}} source={require('../settingsIcons/weather.png')}/>
                    <Text style={{left:10,fontSize:15}}>Weather</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'75%',marginVertical:'3%'}}/>
            <TouchableOpacity onPress={()=>{alert('Pressed Logout')}} style={{width:'80%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'red',borderRadius:10}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:20,color:'white'}}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    : actionType == 'Account' ? <Account user={props.user}/>
    : actionType == 'Navigation' ? <Navigation />
    : actionType == 'Weather' ? <View><Text>This is Weather Setting Page</Text></View>
    : null
    )
}

const Style = StyleSheet.create({
    title:{
        fontSize:20,
        marginTop:20
    },
    units:{
        width:100,
        height:50,
        borderRadius:10,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'3%'
    },
    unitsWeather:{
        width:90,
        height:50,
        borderRadius:10,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'3%'
    }
})