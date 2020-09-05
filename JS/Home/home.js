import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Text } from 'react-native'
import { clearsearch } from '../../actions/submitsearch/clearsearch'
import Uimage from './uimage'
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import Search from '../Components/search/search'
import Geolocation from '@react-native-community/geolocation'
import CustomMarker from '../Components/marker/customMarker'
import Placeinfo from '../Components/placeselect/placeinfo'
import Geocoder from 'react-native-geocoder-reborn'
import { Myposition } from '../Components/location/myposition'

const Home = (props) => {
    const [user, setuser] = useState({})
    const [places,setplaces] = useState([])
    const [allowed,setallowed] = useState(false)
    const [showme,setshowme] = useState(false)
    const [placeSelection,setSelection] = useState({
        name: '',
        rating: '',
        placeid: ''
    })
    let map = null
    const dispatch = useDispatch()
    const [position, setposition] = useState({
        latitude: 41.429960,
        longitude: -81.696900,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0000
    })

    getCurrentLocation = () => {
        //calling watchID and then if any getting current location details
        if(allowed == false){
            console.log(map)
            Geolocation.getCurrentPosition(
                pos => {
                    setshowme(true)
                    setallowed(true)
                    let region = {
                        latitude: parseFloat(pos.coords.latitude),
                        longitude: parseFloat(pos.coords.longitude),
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    };
                    setposition(region)
                },
                error => console.log(error),
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                }
            );
        }
        Geolocation.watchPosition = () => {
            watchID => {
                Geolocation.getCurrentPosition(
                    pos => {
                        let region = {
                            latitude: parseFloat(pos.coords.latitude),
                            longitude: parseFloat(pos.coords.longitude),
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.000
                        };
                        setposition(region)
                    },
                    error => console.log(error),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            }
        }
    }

    useEffect(() => {
        setuser(props.route.params.user)
        getCurrentLocation()
    })

    useSelector((state)=>{
        if(state.placesearch.length > 0){
            setplaces(state.placesearch)
            dispatch(clearsearch())
        }
    })

    regionChange = (e) => {
        setfollow(false)
        setdrag({
            latitude: e.latitude,
            longitude: e.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0005
        })
    }

    findUser = () => {
        setfollow(true)
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <View style={Styles.Page}>
                <MapView showsBuildings
                    ref={ref => { map = ref }}
                    followUserLocation={showme}
                    showsUserLocation={showme}
                    showsPointsOfInterest={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    region={position}
                    //onUserLocationChange={position.latitude,position.longitude}
                    //onMapReady={map.fitToSuppliedMarkers()}
                    style={{ height: '100%', width: '100%', alignItems: 'center' }}
                    initialRegion={position}
                    onLayout={() => {
                        //will have control to move angel based on speed using hooks
                        map.animateCamera(45);
                        map.animateToViewingAngle(180)

                    }}>
                        {places.map((place)=>{
                            return <Marker onPress={()=>setSelection({
                                        name: place.name,
                                        rating: place.rating,
                                        placeid: place.placeid
                                    })} style={{height:20}}  coordinate={{latitude: place.geo.lat, longitude: place.geo.lng}} >
                                <CustomMarker place={place}/>
                            </Marker>
                         })}
                </MapView>
            </View>
            <View style={{ width: '100%', height:'10%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <TouchableOpacity style={Styles.ContactBox}></TouchableOpacity>
                <View style={Styles.SearchBox}>
                    <Search position={position}/>
                </View>
                <TouchableOpacity style={Styles.ImageBox}>
                    {user.photo != '' ? <Image source={{ uri: user.image }} /> : <Uimage name={user.name} />}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={Styles.CloseSelection}>
                <Text style={{fontSize:20}}>X</Text>
            </TouchableOpacity>
            <View style={Styles.PlaceSelection}>
                {placeSelection.name != '' && placeSelection.placeid != '' ? <Placeinfo place={placeSelection} /> : null}
            </View>
        </View>
    )
}

export default Home

const Styles = StyleSheet.create({
    Page: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5810d8',
        position: 'absolute'
    },
    SearchBox: {
        marginTop: '20%',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 0.8,
        width: 280,
        height: 45,
        padding: 13,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    SearchInput: {
        paddingLeft: 1,
        paddingRight: 1,
        width: 210,
        height: 20,
        marginLeft: 10,
        color: 'black'
    },
    ImageBox: {
        marginTop: '20%',
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: '3%',
        marginRight: '3%'
    },
    ContactBox: {
        marginTop: '20%',
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: 'black',
        marginLeft: '1%',
        marginRight: '3%'
    },
    SearchResults: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 14,
        width: 250,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center'
    },
    PlaceSelection:{
        position:'absolute',
        bottom:0,
        height:'35%',
        width:'100%',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 30.65,
        elevation: 8,
    },
    CloseSelection:{
        height:40,
        width:40,
        backgroundColor:'white',
        borderRadius:25,
        position:'absolute',
        bottom:300,
        right:10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 30.65,
        elevation: 8,
        justifyContent:'center',
        alignItems:'center'
    }
})



// {places.length > 0 ?
                    
//     places.map((place)=>{
//         map.animateToBearing(0)
//         map.animateToViewingAngle(180)
//         return <Marker coordinate={{latitude: place.geo.lat, longitude: place.geo.lng}}/>
//     }) : null}
// {position.received == true ? <Marker coordinate={{ latitude: position.latitude, longitude: position.longitude }} /> : null}