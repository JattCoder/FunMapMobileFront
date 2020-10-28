import React,{ useState } from 'react'
import { bottomsheet } from '../../../actions/animation/bottomsheet'
import { useDispatch } from 'react-redux'
import Geocoder from 'react-native-geocoder-reborn'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import { clearsearch } from '../../../actions/submitsearch/clearsearch'
import LinearGradient from 'react-native-linear-gradient'
import { Animated, Image, TextInput, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

export default Search = (props) => {

    const [slide] = useState(new Animated.Value(-Dimensions.get('window').width/1.5))
    const [bar] = useState(new Animated.Value(0))
    let waitTime;
    let closeSrc;
    const dispatch = useDispatch()

    openPlaceSearch = () => {
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
        ]).start()
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
            dispatch(bottomsheet(''))
        })
    }

    onTextChange = (e) => {
        if(e == ''){
            closeSrc = setTimeout(()=>{
                dispatch(clearsearch())
                closePlaceSearch()
            },5000)
        }else{
            dispatch(bottomsheet('Search'))
            if(closeSrc) clearTimeout(closeSrc)
            if(waitTime) clearTimeout(waitTime)
            waitTime = setTimeout(()=>{
                searchPlaces(e)
            },400)
        }
    }

    searchPlaces = (input) => {
        let Geo = {
            lat: 41.499321,
            lng: -81.694359
        };
        if(Geo.lat != 0 && Geo.lng != 0){
            Geocoder.geocodePosition(Geo).then(res => {
                !input.includes(' in ') ? search = `${input} in ${res[0].locality}` : search = input 
                var url = new URL("http://localhost:3000/account/places/search"),
                    params = { input: search }
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                fetch(url)
                .then(res => { return res.json() })
                .then(places => {
                    dispatch(submitsearch(places))
                })
                .catch(err => { console.log(err) })
            }).catch(err => console.log(err))
        }else alert('Please turn on location sharing in settings')
    }

    return(
        <Animated.View style={{width:Dimensions.get('screen').width/1.12,height:55,position:'absolute',right:slide,borderRadius:10,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>openPlaceSearch()} style={{backgroundColor:'#9932cc',borderRadius:10,height:'100%',width:'18%',zIndex:20}}>
                <LinearGradient colors={['#00B4DB','#0083B0']} style={Styles.button}>
                    <Image style={{height:30,width:30,margin:15}} source={require('./search.png')}/>
                </LinearGradient>
            </TouchableOpacity>
            <Animated.View style={{opacity:bar,height:'100%',width:'80%',borderRadius:10,marginLeft:-15,justifyContent:'center',paddingLeft:25,paddingRight:10}}>
                <LinearGradient colors={['#0083B0','#0083B0']} style={Styles.input}>
                    <TextInput onChangeText={(e)=>onTextChange(e)} autoCapitalize='none' placeholder={'Search'} style={{fontSize:20,color:'white'}}/>
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
       width:'100%',
       borderRadius:10,
       justifyContent:'center',
       paddingHorizontal:10,
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