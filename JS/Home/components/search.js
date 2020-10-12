import React,{ useState } from 'react'
import { bottomsheet } from '../../../actions/animation/bottomsheet'
import { useDispatch } from 'react-redux'
import Geocoder from 'react-native-geocoder-reborn'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import { clearsearch } from '../../../actions/submitsearch/clearsearch'
import { Animated, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native'

export default Search = (props) => {

    const [slide] = useState(new Animated.Value(-Dimensions.get('window').width/1.5))
    const [bar] = useState(new Animated.Value(0))
    let waitTime;
    let closeSrc;
    const dispatch = useDispatch()

    openSearch = () => {
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

    closeSearch = () => {
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
                closeSearch()
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
            lat: props.position.latitude,
            lng: props.position.longitude
        };
        Geocoder.geocodePosition(Geo).then(res => {
        !input.includes(' in ') ? search = `${input} in ${res[0].locality}` : search = input 
        var url = new URL("http://localhost:3000/account/search"),
            params = { input: search }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url)
            .then(res => { return res.json() })
            .then(places => {
                if(props.position.latitude == 0 && props.position.longitude == 0 && places.length == 0){
                    //alert('Please turn on your location')
                }else{
                    dispatch(submitsearch(results))
                }
            })
            .catch(err => { console.log(err) })
        }).catch(err => console.log(err))
    }

    return(
        <Animated.View style={{width:Dimensions.get('screen').width/1.12,height:55,position:'absolute',right:slide,borderRadius:10,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>openSearch()} style={{backgroundColor:'#9932cc',borderRadius:10,height:'100%',width:'18%',justifyContent:'center',alignItems:'center',zIndex:20}}>
              <Image style={{height:30,width:30,margin:15}} source={require('./search.png')}/>
            </TouchableOpacity>
            <Animated.View style={{opacity:bar,height:'100%',width:'80%',backgroundColor:'#00BFFF',borderRadius:10,marginLeft:-15,justifyContent:'center',paddingLeft:25,paddingRight:10}}>
                <TextInput onChangeText={(e)=>onTextChange(e)} placeholder={'Search'} style={{fontSize:20,color:'white'}}/>
            </Animated.View>
        </Animated.View>
    )
}