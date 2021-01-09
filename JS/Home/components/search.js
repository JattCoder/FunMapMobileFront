import React,{ useState, useEffect } from 'react'
import { bottomsheet } from '../../../actions/animation/bottomsheet'
import { useDispatch, useSelector } from 'react-redux'
import Geocoder from 'react-native-geocoder-reborn'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import { clearsearch } from '../../../actions/submitsearch/clearsearch'
import { clearnavigation } from '../../../actions/navigation/clearnavigation'
import LinearGradient from 'react-native-linear-gradient'
import { Animated, Image, TextInput, Dimensions, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native'

export default Search = (props) => {

    const [slide] = useState(new Animated.Value(-Dimensions.get('window').width/1.5))
    const [bar] = useState(new Animated.Value(0))
    const [typeSearchWidth] = useState(new Animated.Value(1))
    const [typeSearchOpacity] = useState(new Animated.Value(1))
    const [shortcutsWidth] = useState(new Animated.Value(0))
    const [shortcutsOpacity] = useState(new Animated.Value(0))
    const [action,setAction] = useState('')
    const [saction,setSaction] = useState('')
    const [location,setLocation] = useState({
        lat:0,
        lng:0
    })
    let waitTime;
    let closeSrc;
    const dispatch = useDispatch()

    const typeWidth = typeSearchWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })

    const shortcutWidth = shortcutsWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })

    openShortCuts = () => {
        Animated.parallel([
            Animated.timing(typeSearchWidth,{
                toValue:0,
                duration:100,
                useNativeDriver:false
            }),
            Animated.timing(typeSearchOpacity,{
                toValue:0,
                duration:100,
                useNativeDriver:false
            }),
            Animated.timing(shortcutsWidth,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(shortcutsOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }),
        ]).start(()=>{
            setSaction('Menu')
        })
    }

    closeShortCuts = () => {
        Animated.parallel([
            Animated.timing(typeSearchWidth,{
                toValue:1,
                duration:100,
                useNativeDriver:false
            }),
            Animated.timing(typeSearchOpacity,{
                toValue:1,
                duration:100,
                useNativeDriver:false
            }),
            Animated.timing(shortcutsWidth,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(shortcutsOpacity,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
        ]).start(()=>{
            setSaction('Open')
        })
    }

    openPlaceSearch = () => {
        if(saction == 'Menu'){
            closeShortCuts()
        }else if(saction == 'Open'){
            closePlaceSearch()
            dispatch(clearsearch())
            setAction('')
        }else{
            Animated.parallel([
                Animated.timing(slide,{
                    toValue:0,
                    duration:500,
                    useNativeDriver:false
                }),
                Animated.timing(bar,{
                    toValue:1,
                    duration:500,
                    useNativeDriver:false
                })
            ]).start(()=>{
                setSaction('Open')
            })
        }
    }

    closePlaceSearch = () => {
        Animated.parallel([
            Animated.timing(slide,{
                toValue:-Dimensions.get('window').width/1.5,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(bar,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            })
        ]).start(()=>{
            setSaction('')
            dispatch(bottomsheet(''))
            dispatch(clearsearch())
            dispatch(clearnavigation())
        })
    }

    onTextChange = (e,type='') => {
        if(e == ''){
            setAction('')
            closeSrc = setTimeout(()=>{
                dispatch(clearsearch())
                closePlaceSearch()
            },5000)
        }else{
            setAction('Type')
            if(closeSrc) clearTimeout(closeSrc)
            if(waitTime) clearTimeout(waitTime)
            waitTime = setTimeout(()=>{
                searchPlaces(e,type)
            },400)
        }
    }

    searchPlaces = (input = '',type = '') => {
        locationPack = []
        if(location.lat != 0 && location.lng != 0){
            fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${type==''?`query=${input}`:`type=${type}`}&location=${location.lat},${location.lng}&radius=10000&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
            .then(res => {return res.json()})
            .then(result => {
                result.results.map(place => {
                    photoC = []
                    if(place.photos) place.photos.map(photo=>{photoC.push(photo.photo_reference)}) 
                    locationPack.push({
                        name: place.name,
                        icon: place.icon,
                        status: place.business_status,
                        address: place.formatted_address,
                        location: place.geometry.location,
                        open: place.opening_hours ? place.opening_hours.open_now : null,
                        placeID: place.place_id,
                        priceLevel: place.price_level ? place.price_level : null,
                        rating : place.rating,
                        types: place.types,
                        photos: photoC
                    })
                })
                dispatch(submitsearch(locationPack))
            })
            .catch(err => console.warn(err))
        }else{
            console.warn('alert')
        }
    }

    useEffect(()=>{
        setLocation({
            lat:props.position.latitude,
            lng:props.position.longitude
        })
    },[props.position])

    return(
        <Animated.View style={{width:Dimensions.get('screen').width/1.12,height:55,position:'absolute',right:slide,borderRadius:10,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>openPlaceSearch()} style={{backgroundColor:'#9932cc',borderRadius:10,height:'100%',width:'18%',zIndex:20}}>
                <LinearGradient colors={['#7F7FD5','#7F7FD5']} style={Styles.button}>
                    <Image style={{height:30,width:30,margin:15}} source={require('./search.png')}/>
                </LinearGradient>
            </TouchableOpacity>
            <Animated.View style={{opacity:bar,height:'100%',width:'80%',borderRadius:10,marginLeft:-15,justifyContent:'center',paddingLeft:25,paddingRight:10}}>
                <LinearGradient colors={['#7F7CD5','#7F7CD5']} style={{height:'100%',width:'100%',borderRadius:10}}>
                    <Animated.View style={[Styles.input,{width:typeWidth,opacity:typeSearchOpacity}]}>
                        <TextInput onChangeText={(e)=>onTextChange(e)} autoCapitalize='none' placeholder={'Search'} style={{fontSize:20,color:'white',position:'absolute',left:10}}/>
                        {action == '' ? <TouchableOpacity onPress={()=>openShortCuts()}  style={{position:'absolute',right:10}}>
                            <Image style={{height:30,width:30}} source={require('../../settingsIcons/menu.png')}/>
                        </TouchableOpacity>
                        : null}
                    </Animated.View>
                    <Animated.View style={{opacity:shortcutsOpacity, width:shortcutWidth,height:'100%',position:'absolute'}}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height:'100%',width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>onTextChange(props.user.home)} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/home.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange(props.user.work)} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/office.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={{width:0,height:'60%',borderWidth:0.5,borderColor:'white',marginHorizontal:5}} />
                            <TouchableOpacity onPress={()=>onTextChange('gas_station','gas_station')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/gas-station.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('cafe','cafe')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/coffee.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('restaurant','restaurant')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/food.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('supermarket','supermarket')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/shopping-cart.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('Hotel')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/hotel.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('car_rental','car_rental')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/rental.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('car_repair','car_repair')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                <Image style={{height:20,width:20}} source={require('../../settingsIcons/car-service.png')}/>
                            </TouchableOpacity>
                        </ScrollView>
                    </Animated.View>
                </LinearGradient>
            </Animated.View>
        </Animated.View>
    )
}

const Styles = StyleSheet.create({
    button:{
        backgroundColor:'#9932cc',
        borderRadius:10,
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        zIndex:20,
        shadowColor: "black",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    input:{
       height:'100%',
       borderRadius:10,
       justifyContent:'center',
       paddingHorizontal:10,
       justifyContent:'center',
       alignItems:'center',
       shadowColor: "black",
       shadowOffset: {
	        width: 0,
	        height: 12,
       },
       shadowOpacity: 0.58,
       shadowRadius: 16.00,
       elevation: 24,
    }
})