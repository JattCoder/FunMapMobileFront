import React,{ useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { navigation } from '../../../actions/navigation/navigation'
import { clearnavigation } from '../../../actions/navigation/clearnavigation'
import polyline from '@mapbox/polyline'
import { clearsearch } from '../../../actions/submitsearch/clearsearch'

export default PlaceSearcgResults = (props) => {

    const [placeInfo,setPlaceInfo] = useState({ name:'' })
    const [images,setImages] = useState([])
    const [displayNavigation,setDisplayNavigation] = useState(false)
    const [routeInfo,setRouteInfo] = useState({distance: '', duration: '', path: []})
    const [naviColor] = useState(new Animated.Value(0))
    const dispatch = useDispatch()

    getPhotos = () => {
        imgs = []
        placeInfo.photos.map(photo => {
            fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
            .then(res => {return res.blob()})
            .then(img => console.warn(img._data))
            .catch(err => console.warn(err))
        })
        setImages(imgs)
    }

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

    getRoute = () => { 
//   //This is how we are getting 
//   extenDays = duration.text.includes('day') 
//   ? parseInt(duration.text.split(' ')[0]) + (parseInt(duration.text.split(' ')[2])/24) 
//   : parseInt(duration.text.split(' ')[0])/24
  
//   nextDate = new Date().setDate(new Date().getDate()+extenDays)
  
//   console.warn('Duration Date: '+new Date(nextDate))
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${props.position.latitude},${props.position.longitude}&destination=${placeInfo.location.lat},${placeInfo.location.lng}&avoid=${props.user.highways?'highways':''}|${props.user.ferries?'ferries':''}|${props.user.tolls?'tolls':''}&mode=${props.user.drivingMode}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => {return res.json()})
        .then(result => {
            if(result.status === 'ZERO_RESULTS') {
                alert('No Route')
            }else{
                path = []
                pth = ''
                polyline.decode(result.routes[0].overview_polyline.points).map(step => {
                    path.push({latitude:step[0],longitude:step[1]})
                    pth += `${step[0]},${step[1]}|`
                })
                pth = pth.replace(/.$/,'')
                fetch(`https://roads.googleapis.com/v1/snapToRoads?path=${pth}&interpolate=true&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
                .then(res => {return res.json()})
                .then(info => {
                    finalpath = []
                    info.snappedPoints.map(loc => {
                        finalpath.push([loc.location.latitude,loc.location.longitude])
                    })
                    dispatch(navigation(false,path))
                    setRouteInfo({distance:result.routes[0].legs[0].distance.text, duration:result.routes[0].legs[0].duration.text, path})
                    setDisplayNavigation(true)
                    displayNaviAnim()
                })
                .catch(err => console.warn('Road Snapping Error: ',err))
            }
        })
        .catch(err => console.warn('Directions Error: ',err))
    }

    routeCheck = () => {
        //Create another file, where we will be cheking if user if passing by geo spots of polyline

        //if near or on the geo spot, then grab next geo spot and 
        //check if getting further from first one and getting close to next one

        //getting further from first one and not getting closer to second one, then warn user and find another route from
        //currect location

        //NEED TO KEEP IN MIND, GIVE SOME TIME TO DEVICE TO GET BACK ON TRACK, SOMETIMES DEVICES ARE LAGGY

        //NEED TO TUNE UP A BIT, SO IT'S ACCURATE AS POSSIBLE
        console.warn(props.position.latitude)
    }

    useSelector((state)=>{
        if(state.marker != placeInfo){
            hideNaviAnim()
            state.navigation.path.length > 0 ? dispatch(clearnavigation()) : null
            setDisplayNavigation(false)
            setPlaceInfo(state.marker)
            //if(placeInfo.name != '') getPhotos()
        }
        if(state.navigation.active) routeCheck()
    })

    const naviColorInterpolate = naviColor.interpolate({
        inputRange:[0,1],
        outputRange:['#7F7FD5', '#32CD32']
    })

    letsGo = () => {
        dispatch(navigation(true,routeInfo.path))
        props.hide()
    }

    return( placeInfo.name != '' ? <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/1.5,alignItems:'center'}}>
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
                <TouchableOpacity onPress={()=> !displayNavigation ? getRoute() : dispatch(navigation(true,routeInfo.path))} style={{width:'100%',height:'100%',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                    {!displayNavigation ? <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Navigate</Text>
                    : <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Start - {routeInfo.distance.split(' ')[0]} {routeInfo.distance.split(' ')[1] == 'mi' ? 'Mi' : 'Km'}</Text>}
                </TouchableOpacity>
            </Animated.View>
        </View>
    </View> : null )
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
    }
})