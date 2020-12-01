import React,{ useState } from 'react'
import { bottomsheet } from '../../../actions/animation/bottomsheet'
import { useDispatch, useSelector } from 'react-redux'
import Geocoder from 'react-native-geocoder-reborn'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import { clearsearch } from '../../../actions/submitsearch/clearsearch'
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
    const [city,setCity] = useState('')
    const [saction,setSaction] = useState('')
    let waitTime;
    let closeSrc;
    const dispatch = useDispatch()
    const location = useSelector(state => {return state.mylocation.complete})

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
        })
    }

    onTextChange = (e) => {
        if(e == ''){
            setAction('')
            closeSrc = setTimeout(()=>{
                dispatch(clearsearch())
                closePlaceSearch()
            },5000)
        }else{
            setAction('Type')
            //dispatch(bottomsheet('Search'))
            if(closeSrc) clearTimeout(closeSrc)
            if(waitTime) clearTimeout(waitTime)
            waitTime = setTimeout(()=>{
                searchPlaces(e)
            },400)
        }
    }

    searchPlaces = (input = '') => {
        if(city != ''){
            !input.includes(' in ') ? search = `${input} in ${city}` : search = input 
            var url = new URL("http://localhost:3000/account/places/search"),
                params = { input: search }
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url)
            .then(res => { return res.json() })
            .then(places => {
                dispatch(submitsearch(places))
            })
            .catch(err => { console.log(err) })
        }else{
            console.warn('alert')
        }
    }

    useSelector((state)=>{
        if(state.mylocation.complete != '')
            if(city != state.mylocation.complete)
                setCity(state.mylocation.complete)
    })

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
                            <TouchableOpacity onPress={()=>alert('lets drive to home')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/home.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>alert('lets drive to work')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/office.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Work</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={{width:0,height:'60%',borderWidth:0.5,borderColor:'white',marginHorizontal:5}} />
                            <TouchableOpacity onPress={()=>onTextChange('Gas Station')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/gas-station.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Gas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('Coffee')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/coffee.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Coffee</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('Restraunt')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/food.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Food</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('Shop')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/shopping-cart.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Shop</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('Hotel')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/hotel.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Hotel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('Car Rental')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/rental.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Rent</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onTextChange('Car Service')} style={{justifyContent:'center',alignItems:'center',height:'100%',width:45}}>
                                <Image style={{height:25,width:25}} source={require('../../settingsIcons/car-service.png')}/>
                                <Text style={{color:'white',fontSize:12,marginHorizontal:'3%'}}>Service</Text>
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