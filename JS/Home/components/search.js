import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import LinearGradient from 'react-native-linear-gradient'
import { Animated, Image, TextInput, Dimensions, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native'

export default Search = (props) => {

    const [slide] = useState(new Animated.Value(-Dimensions.get('window').width/1.5))
    const [bar] = useState(new Animated.Value(0))
    const [typeSearchWidth] = useState(new Animated.Value(1))
    const [typeSearchOpacity] = useState(new Animated.Value(1))
    const [shortcutsWidth] = useState(new Animated.Value(0))
    const [shortcutsOpacity] = useState(new Animated.Value(0))
    const [action,setAction] = useState('')
    const [saction,setSaction] = useState('')
    const [navigating,setNavigating] = useState(false)
    const [openQuickSearchOpacity] = useState(new Animated.Value(1))
    const [closeQuickSearchOpacity] = useState(new Animated.Value(0))
    const [openQuickSearchHeight] = useState(new Animated.Value(1))
    const [closeQuickSearchHeight] = useState(new Animated.Value(0))
    const [homeColor] = useState(new Animated.Value(0))
    const [workColor] = useState(new Animated.Value(0))
    const [gasColor] = useState(new Animated.Value(0))
    const [coffeeColor] = useState(new Animated.Value(0))
    const [foodColor] = useState(new Animated.Value(0))
    const [shoppingColor] = useState(new Animated.Value(0))
    const [hotelColor] = useState(new Animated.Value(0))
    const [carRentalColor] = useState(new Animated.Value(0))
    const [carServiceColor] = useState(new Animated.Value(0))
    const [driving,setDriving] = useState(false)
    const [drivingMode] = useState(new Animated.Value(0))
    const [drivingModeOpacity] = useState(new Animated.Value(0))
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
            Animated.timing(openQuickSearchHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(openQuickSearchOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(closeQuickSearchHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(closeQuickSearchOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            })
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
            Animated.timing(openQuickSearchHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(openQuickSearchOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(closeQuickSearchHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(closeQuickSearchOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            })
        ]).start(()=>{
            setSaction('Open')
        })
    }

    openPlaceSearch = () => {
        if(saction == 'Menu'){
            closeShortCuts()
        }else if(saction == 'Open'){
            closePlaceSearch()
            dispatch(submitsearch())
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
            driving ? changeTodrivingMode() : changeToNonDrivingMode()
        })
    }

    changeTodrivingMode = () => {
        Animated.parallel([
            Animated.timing(openQuickSearchHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(openQuickSearchOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(drivingMode,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(drivingModeOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            })
        ]).start(()=>{
            setSaction('Voice')
        })
    }

    changeToNonDrivingMode = () => {
        Animated.parallel([
            Animated.timing(openQuickSearchHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(openQuickSearchOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(drivingMode,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(drivingModeOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            })
        ]).start(()=>{
            setSaction('')
        })
    }

    openVoiceSearch = () => {
        alert('will open voice search at this point')
    }

    onTextChange = (e,type='') => {
        if(e == ''){
            setAction('')
            closeSrc = setTimeout(()=>{
                dispatch(submitsearch())
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
            console.warn('Failed to Search Results')
        }
    }

    useSelector(state => {
        if(state.navigation.active != driving){
            closeShortCuts()
            setTimeout(()=>{
                closePlaceSearch()
            },250)
            setDriving(state.navigation.active)
        }
    })

    useEffect(()=>{
        setLocation({lat:props.position.latitude,lng:props.position.longitude})
    },[props.position,props.user])

    const openSearchHeightInterpolate = openQuickSearchHeight.interpolate({
        inputRange:[0,1],
        outputRange:[0,47]
    })

    const closeSearchHeightInterpolate = closeQuickSearchHeight.interpolate({
        inputRange:[0,1],
        outputRange:[0,47]
    })

    const drivingModeInterpolate = drivingMode.interpolate({
        inputRange:[0,1],
        outputRange:[0,47]
    })

    const homeColorInterpolate = homeColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const workColorInterpolate = workColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const gasColorInterpolate = gasColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const coffeeColorInterpolate = coffeeColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const foodColorInterpolate = foodColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const shopColorInterpolate = shoppingColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const hotelColorInterpolate = hotelColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const carRentalColorInterpolate = carRentalColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    const carRepairColorInterpolate = carServiceColor.interpolate({
        inputRange:[0,1],
        outputRange:['#f3ebe1','#4169e1']
    })

    return(
        <Animated.View style={{width:Dimensions.get('screen').width/1.12,height:55,position:'absolute',right:slide,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>navigating ? openVoiceSearch() : openPlaceSearch()} style={{backgroundColor:'black',borderRadius:50,height:50,width:50,zIndex:20,justifyContent:'center',alignItems:'center'}}>
                <Animated.View style={{backgroundColor:'white',borderRadius:50,height:openSearchHeightInterpolate,width:47,justifyContent:'center',alignItems:'center',opacity:openQuickSearchOpacity}}>
                    <Image style={{height:30,width:30,margin:15}} source={require('../../settingsIcons/search.png')}/>
                </Animated.View>
                <Animated.View style={{backgroundColor:'white',borderRadius:50,height:closeSearchHeightInterpolate,width:47,justifyContent:'center',alignItems:'center',opacity:closeQuickSearchOpacity}}>
                    <Image style={{height:25,width:25,margin:15,transform:[{rotate:'270deg'}]}} source={require('../../settingsIcons/arrow.png')}/>
                </Animated.View>
                <Animated.View style={{backgroundColor:'white',borderRadius:50,height:drivingModeInterpolate,width:47,justifyContent:'center',alignItems:'center',opacity:drivingModeOpacity}}>
                    <Image style={{height:25,width:25,margin:15,}} source={require('../../settingsIcons/mic.png')}/>
                </Animated.View>
            </TouchableOpacity>
            <Animated.View style={{opacity:bar,height:'100%',width:'80%',marginLeft:-15,justifyContent:'center',paddingLeft:25,paddingRight:10}}>
                <LinearGradient colors={['rgba(255, 255, 255, 1)','rgba(255, 255, 255, 1)']} style={{height:'100%',width:'100%',borderRadius:50,borderWidth:1.5,borderColor:'black'}}>
                    <Animated.View style={[Styles.input,{width:typeWidth,opacity:typeSearchOpacity}]}>
                        <TextInput onChangeText={(e)=>onTextChange(e)} autoCapitalize='none' placeholder={'Search'} style={{fontSize:20,color:'black',position:'absolute',left:10,width:'100%',paddingVertical:0,paddingHorizontal:10}}/>
                        {action == '' ? <TouchableOpacity onPress={()=>openShortCuts()}  style={{position:'absolute',right:10}}>
                            <Image style={{height:30,width:30}} source={require('../../settingsIcons/menu.png')}/>
                        </TouchableOpacity>
                        : null}
                    </Animated.View>
                    <Animated.View style={{opacity:shortcutsOpacity, width:shortcutWidth,height:'100%',position:'absolute'}}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height:'100%',width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                            <Animated.View style={{backgroundColor:homeColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:5}}>
                                <TouchableOpacity onPress={()=>onTextChange(props.user.home)} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/home.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={{backgroundColor:workColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:1}}>
                                <TouchableOpacity onPress={()=>onTextChange(props.user.work)} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/office.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <TouchableOpacity activeOpacity={1} style={{width:0,height:'60%',borderWidth:0.5,borderColor:'black',marginHorizontal:5}} />
                            <Animated.View style={{backgroundColor:gasColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50}}>
                                <TouchableOpacity onPress={()=>onTextChange('gas_station','gas_station')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/gas-station.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={{backgroundColor:coffeeColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:1}}>
                                <TouchableOpacity onPress={()=>onTextChange('cafe','cafe')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/coffee.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={{backgroundColor:foodColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:1}}>
                                <TouchableOpacity onPress={()=>onTextChange('restaurant','restaurant')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/food.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={{backgroundColor:shopColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:1}}>
                                <TouchableOpacity onPress={()=>onTextChange('supermarket','supermarket')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/shopping-cart.png')}/>
                                </TouchableOpacity> 
                            </Animated.View>
                            <Animated.View style={{backgroundColor:hotelColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:1}}>
                                <TouchableOpacity onPress={()=>onTextChange('Hotel')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/hotel.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={{backgroundColor:carRentalColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:1}}>
                                <TouchableOpacity onPress={()=>onTextChange('car_rental','car_rental')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/rental.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={{backgroundColor:carRepairColorInterpolate,height:40,width:40,justifyContent:'center',alignItems:'center',borderRadius:50,marginHorizontal:5}}>
                                <TouchableOpacity onPress={()=>onTextChange('car_repair','car_repair')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:35}}>
                                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/car-service.png')}/>
                                </TouchableOpacity>
                            </Animated.View>
                        </ScrollView>
                    </Animated.View>
                </LinearGradient>
            </Animated.View>
        </Animated.View>
    )
}

const Styles = StyleSheet.create({
    button:{
        backgroundColor:'#808080',
        borderRadius:50,
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