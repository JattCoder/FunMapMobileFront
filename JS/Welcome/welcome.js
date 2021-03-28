import React,{ useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, Dimensions, Animated, Text, Image, ActivityIndicator } from 'react-native'
import Fetchfamilies from './components/fetchfamilies'
import Location from '../FindMe/location'
import Home from '../Home/home'

export default Welcome = (props) => {

    const [user,setUser] = useState({})
    const [name,setName] = useState('')
    const [families,setFamilies] = useState(false)
    const [location,setLocation] = useState(false)
    const [infoFrameHeight] = useState(new Animated.Value(0))
    const [infoFrameOpacity] = useState(new Animated.Value(0))
    const [nameWidth] = useState(new Animated.Value(0))
    const [LoadIcon] = useState(new Animated.Value(0))
    const [welcomeHeight] = useState(new Animated.Value(1))
    const [welcomeOpacity] = useState(new Animated.Value(1))
    const [homeHeight] = useState(new Animated.Value(0))
    const [homeOpacity] = useState(new Animated.Value(0))

    displayHome = () => {
        Animated.parallel([
            Animated.timing(welcomeHeight,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(welcomeOpacity,{
                toValue:0,
                duration:350,
                useNativeDriver:false
            })
        ]).start(()=>{
            Animated.parallel([
                Animated.timing(homeHeight,{
                    toValue:1,
                    duration:500,
                    useNativeDriver:false
                }),
                Animated.timing(homeOpacity,{
                    toValue:1,
                    duration:350,
                    useNativeDriver:false
                })
            ]).start()
        })
    }

    startLoadingAnimation = () => {
        Animated.parallel([
            Animated.timing(LoadIcon,{
                toValue:1,
                duration:800,
                useNativeDriver:false
            })
        ]).start(()=>Animated.parallel([
            Animated.timing(LoadIcon,{
                toValue:0,
                duration:800,
                useNativeDriver:false
            })
        ]).start(()=>startLoadingAnimation()))
    }

    animateDisplay = () => {
        Animated.timing(infoFrameHeight,{
            toValue:1,
            duration:500,
            useNativeDriver:false
        }).start(()=>{
            Animated.timing(infoFrameOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }).start(()=>{
                Animated.timing(nameWidth,{
                    toValue:1,
                    duration:700,
                    useNativeDriver:false
                }).start()
            })
        })
    }

    updateValues = () => {
        fn = props.user.name.split(' ')[0].split('')[0]
        ln = props.user.name.split(' ')[props.user.name.split(' ').length - 1].split('')[0]
        nm = fn+ln
        setName(nm)
        setUser(props.user)
        startLoadingAnimation()
        setTimeout(()=>animateDisplay(),1000)
    }

    useSelector(state => {
        if(families != true && state.family.length > 0) setFamilies(true)
        if(state.mylocation.latitude != 0 && state.mylocation.longitude != 0 && !location) setLocation(true)
    })

    useEffect(()=>{
        if(props.user.name) updateValues()
    })

    const infoFrameHeightInterpolate = infoFrameHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','80%']
    })

    const nameWidthInterpolate = nameWidth.interpolate({
        inputRange:[0,1],
        outputRange:['0%','100%']
    })

    const LoadIconInterpolate = LoadIcon.interpolate({
        inputRange:[0,1],
        outputRange:['180deg','360deg']
    })

    const welcomeHeightInterpolate = welcomeHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','50%']
    })

    const homeHeightInterpolate = homeHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','100%']
    })

    if(location && families) displayHome()

    return(
        <View style={Styles.frame}>
            <Fetchfamilies fams={user.families}/>
            {families ? location.latitude == 0 && location.longitude == 0 ? <Location /> : null : null}
            <Animated.View style={[Styles.innerFrame,{height:welcomeHeightInterpolate,opacity:welcomeOpacity}]}>
                <View><Text style={{fontSize:30,fontWeight:'bold'}}>Welcome</Text></View>
                <Animated.View style={{height:infoFrameHeightInterpolate,opacity:infoFrameOpacity,width:'100%'}}>
                    <Animated.View style={Styles.userImageFrame}>
                        <View style={Styles.userImageBackground}>
                            <Text style={Styles.name}>{name}</Text>
                        </View>
                    </Animated.View>
                    <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <Animated.View style={{width:nameWidthInterpolate,justifyContent:'center',alignItems:'center'}}>
                            <Text numberOfLines={1} style={{fontSize:20}}>{props.user.name}</Text>
                        </Animated.View>
                    </View>
                    <View style={Styles.bodyFrame}>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:'5%'}}>
                            {families ? <Image style={{height:30,width:30}} source={require('../settingsIcons/checkmark.png')}/> : <ActivityIndicator size={'small'} color={'black'}/>}
                            <Text style={{fontSize:25,marginLeft:'3%'}}>Families</Text>
                        </View>
                        {families ? <View style={{flexDirection:'row',alignItems:'center'}}>
                            {location.latitude != 0 && location.latitude != 0 ? <Image style={{height:30,width:30}} source={require('../settingsIcons/checkmark.png')}/> : <ActivityIndicator size={'small'} color={'black'}/>}
                            <Text style={{fontSize:25,marginLeft:'3%'}}>Location</Text>
                        </View> : null}
                    </View>
                </Animated.View>
            </Animated.View>
            <Animated.View style={{width:'100%',height:homeHeightInterpolate,opacity:homeOpacity}}> 
                <Home user={props.user} location={location}/>
            </Animated.View>
        </View>
    )
}

const Styles = StyleSheet.create({
    frame:{
        height:Dimensions.get('screen').height,
        width:Dimensions.get('screen').width,
        justifyContent:'center',
        alignItems:'center'
    },
    innerFrame:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center'
    },
    userImageFrame:{
        width:'100%',
        height:'30%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%'
    },
    userImageBackground:{
        borderRadius:50,
        height:100,
        width:100,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        fontSize:25,
        color:'white'
    },
    bodyFrame:{
        width:'100%',
        height:'70%',
        alignItems:'center',
        marginTop:'20%'
    },
    famLoading:{
        width:20,
        height:20,
        borderRadius:50,
        borderTopWidth:5,
        borderTopColor:'black',
        borderLeftColor:'rgba(0,0,0,0)',
        borderLeftWidth:0,
        borderBottomWidth:2,
        borderBottomColor:'rgba(0,0,0,0.4)',
        borderRightWidth:4,
        borderRightColor:'rgba(0,0,0,0.66)'
    },
    locationLoading:{
        width:20,
        height:20,
        borderRadius:50,
        borderTopWidth:5,
        borderTopColor:'black',
        borderLeftColor:'rgba(0,0,0,0)',
        borderLeftWidth:0,
        borderBottomWidth:2,
        borderBottomColor:'rgba(0,0,0,0.4)',
        borderRightWidth:4,
        borderRightColor:'rgba(0,0,0,0.66)'
    }
})

