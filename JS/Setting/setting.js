import React,{ useState } from 'react'
import { View, TouchableOpacity, Text, Image, Animated } from 'react-native'
import { useDispatch } from 'react-redux'
import Account from '../Components/settings/account'
import Navigation from '../Components/settings/navigation'

export default Setting = (props) => {

    const dispatch = useDispatch()
    const [settingOpacity] = useState(new Animated.Value(1))
    const [accountOpacity] = useState(new Animated.Value(0))
    const [accountHeight] = useState(new Animated.Value(0))
    const [navigationOpacity] = useState(new Animated.Value(0))
    const [navigationHeight] = useState(new Animated.Value(0))

    openAccountSettings = () => {
        Animated.parallel([
            Animated.timing(settingOpacity,{
                toValue:0,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(accountOpacity,{
                toValue:1,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(accountHeight,{
                toValue:350,
                duration:400,
                useNativeDriver:false
            })
        ]).start()
    }

    openNavigationSettings = () => {
        Animated.parallel([
            Animated.timing(settingOpacity,{
                toValue:0,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(navigationOpacity,{
                toValue:1,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(navigationHeight,{
                toValue:350,
                duration:400,
                useNativeDriver:false
            })
        ]).start()
    }

    return(
        <View style={{marginTop:'-5%',height:'135%',width:'100%',alignItems:'center'}}>
            <Animated.View style={{height:accountHeight,width:'100%',opacity:accountOpacity}}>
                <Account user={props.user}/>
            </Animated.View>
            <Animated.View style={{height:navigationHeight,width:'100%',opacity:navigationOpacity}}>
                <Navigation user={props.user}/>
            </Animated.View>
            <Animated.View style={{height:'6%',width:'100%',alignItems:'center', opacity:settingOpacity}}>
                <TouchableOpacity onPress={()=>openAccountSettings()} style={{width:'80%',height:'100%',justifyContent:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{height:30,width:30}} source={require('../settingsIcons/account.png')}/>
                        <Text style={{left:10,fontSize:15}}>Account</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5,borderColor:'#808080',width:'75%',marginVertical:'3%'}}/>
                <TouchableOpacity onPress={()=>openNavigationSettings()} style={{width:'80%',height:'100%',justifyContent:'center'}}>
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
            </Animated.View>
        </View>
    )
}