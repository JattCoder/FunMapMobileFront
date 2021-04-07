import React,{ useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { navigation } from '../../../actions/navigation/navigation'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import { clearnavigation } from '../../../actions/navigation/clearnavigation'
import polyline from '@mapbox/polyline'
import Navigating from '../components/navigating'

export default PlaceSearcgResults = (props) => {

    const [placeInfo,setPlaceInfo] = useState({ name:'' })
    const [images,setImages] = useState([])
    const [currentLocation,setCurrentLocation] = useState({latitude:0,longitude:0})
    const [displayNavigation,setDisplayNavigation] = useState(false)
    const [routeInfo,setRouteInfo] = useState({pth: [], info: {}, step: ''})
    const [naviColor] = useState(new Animated.Value(0))
    const [active,setActive] = useState(false)
    const dispatch = useDispatch()

    displayNaviAnim = () => {
        Animated.timing(naviColor,{
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    hideNaviAnim = () => {
        Animated.timing(naviColor,{
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    getRoute = (finalize) => {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${props.position.latitude},${props.position.longitude}&destination=${placeInfo.location.lat},${placeInfo.location.lng}&avoid=${props.user.settings.highways?'highways':''}|${props.user.settings.ferries?'ferries':''}|${props.user.settings.tolls?'tolls':''}&mode=${props.user.settings.drivingMode}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => {return res.json()})
        .then(result => {
            if(result.status === 'ZERO_RESULTS') {
                alert('No Route')
            }else{
                path = []
                completeInfo = {
                    duration: result.routes[0].legs[0].duration.text,
                    durationVal: result.routes[0].legs[0].duration.value,
                    distance: result.routes[0].legs[0].distance.text,
                    destination: {latitude:result.routes[0].legs[0].end_location.lat,longitude:result.routes[0].legs[0].end_location.lng},
                    steps: []
                }
                result.routes[0].legs[0].steps.map(step => {
                    polyline.decode(step.polyline.points).map(step => {
                        path.push({latitude:step[0],longitude:step[1]})
                    })
                    completeInfo.steps.push({
                        distance: step.distance.text,
                        duration: step.duration.text,
                        durationVal: step.duration.value,
                        instruction: step.html_instructions,
                        polyline: step.polyline.points
                    })
                })
                dispatch(submitsearch([]))
                if(path.length > 0) dispatch(navigation(finalize,path))
                setDisplayNavigation(true)
                displayNaviAnim()
                setRouteInfo({
                    pth: path,
                    info: completeInfo
                })
            }
        })
        .catch(err => console.warn('Directions Error: ',err))
    }

    useSelector((state)=>{
        if(state.marker != placeInfo){
            setPlaceInfo(state.marker)
        }
        if(state.navigation.active && !active){
            setActive(true)
        }
    })

    const naviColorInterpolate = naviColor.interpolate({
        inputRange:[0,1],
        outputRange:['#7F7FD5', '#32CD32']
    })
    
    return( placeInfo.name != '' && !active ? <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/1.5,alignItems:'center'}}>
        <View style={Styles.Icon}><Image style={{height:'50%',width:'50%',padding:'10%'}} source={{uri:placeInfo.icon}}/></View>
        <Text style={{fontWeight:'bold',color:'white',fontSize:20,margin:'3%'}}>{placeInfo.name}</Text>
        <Text style={{alignContent:'center',fontSize:11}}>{placeInfo.address}</Text>
        <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginVertical:'4%',flexDirection:'row'}}>
            <View style={{height:35,width:35,borderRadius:50,justifyContent:'center',alignItems:'center',borderColor:'#7F7FD5',borderWidth:1}}>
                <Image style={{height:17,width:17}} source={require('../../settingsIcons/star.png')} />
                <Text style={{fontSize:10}}>{placeInfo.rating}</Text>
            </View>
            <View style={{height:35,width:35,borderRadius:50,justifyContent:'center',alignItems:'center',borderColor:'#7F7FD5',borderWidth:1,marginHorizontal:'4%'}}>
                {placeInfo.priceLevel <= 1 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/greenDollar.png')}/> 
                : placeInfo.priceLevel <= 2 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/orangeDollar.png')}/>
                : placeInfo.priceLevel <= 3 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/completeOrangeDollar.png')}/>
                : placeInfo.priceLevel <= 4 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/redDollar.png')}/>
                : <Image style={{height:25,width:25}} source={require('../../settingsIcons/completeRedDollar.png')}/>}
            </View>
            <TouchableOpacity onPress={()=>console.warn('add it to favs')} style={{height:35,width:35,borderRadius:50,justifyContent:'center',alignItems:'center',borderColor:'#7F7FD5',borderWidth:1}}>
                <Image style={{height:25,width:25}} source={require('../../settingsIcons/fav.png')} />
            </TouchableOpacity>
        </View>
        <View style={{width:'100%',height:'10%',justifyContent:'center'}}>
            <Animated.View style={{width:'40%', height:'70%',marginLeft:'5%',backgroundColor:naviColorInterpolate,borderRadius:50}}>
                <TouchableOpacity onPress={()=> !displayNavigation ? getRoute(false) : dispatch(navigation(true,routeInfo.pth))} style={{width:'100%',height:'100%',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                    {!displayNavigation ? <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Navigate</Text>
                    : <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Start - {routeInfo.info.distance}</Text>}
                </TouchableOpacity>
            </Animated.View>
        </View>
    </View> : displayNavigation ? <View style={Styles.navigatingStyle}><Navigating position={props.position} rInfo={routeInfo} reRoute={()=>getRoute(true)}/></View> : null )
}

const Styles = StyleSheet.create({
    Icon:{
        width:Dimensions.get('screen').width/7.2,
        height:Dimensions.get('screen').height/17.2,
        borderRadius:50,
        borderLeftColor:'#7F7FD5',
        borderTopColor:'rgba( 0, 0, 0, 0.0)',
        borderBottomColor:'#7F7FD5',
        borderRightColor:'#7F7FD5',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderLeftWidth:2,
        borderRightWidth:2
    },
    Outer:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:'1%',
        marginHorizontal:'1%',
    },
    Item:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:15,
        borderWidth:0.5,
        borderStartColor:'white',
        marginVertical:'1%',
        shadowColor:'white',
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 50,
    },
    navigatingStyle:{
        width:Dimensions.get('screen').width,
        height:'60%',
        justifyContent:'center',
        alignItems:'center',
    }
})