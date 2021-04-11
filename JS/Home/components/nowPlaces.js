import React,{ useEffect, useState } from 'react'
import { View, Text, Animated, ScrollView, ImageBackground } from 'react-native'

export default NowPlaces = (props) => {

    const [places,setPlaces] = useState([])

    getLocationPhoto = (photo_ref) => {
        let url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo_ref}&sensor=false&maxheight=1600&maxwidth=1600&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`
        var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            //getting proper url here but not able to submit url to ImageBackground somehow
            xhr.onload = () => {return xhr.responseURL}
            xhr.send(null);
    }

    useEffect(()=>{
        if(props.places) getLocationPhoto()
    },[props.places])

    return <View style={{height:'100%',width:'100%'}}>
        <ScrollView  style={{flex:1, padding:10}}>
            {props.places.map(place => {
                if(place.photos.length > 0) {
                    response = getLocationPhoto(place.photos[0].photo_reference)
                    console.warn(response)
                }
                return <View style={{width:'100%',height:'20%',justifyContent:'center',alignItems:'center'}}>
                    <Animated.View style={{width:'95%',height:'90%',backgroundColor:'red',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                        <ImageBackground  style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                            <Text>{place.name}</Text>
                        </ImageBackground>
                    </Animated.View>
                </View>
            })}
        </ScrollView>
    </View>

}