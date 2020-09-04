import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Text } from 'react-native'
import { clearsearch } from '../../actions/submitsearch/clearsearch'
import Uimage from './uimage'
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import Search from '../Components/search/search'
import Geolocation from '@react-native-community/geolocation'
import Customarker from '../Components/marker/customarker'
import Geocoder from 'react-native-geocoder-reborn';
import { Myposition } from '../Components/location/myposition'

const Home = (props) => {
    const [user, setuser] = useState({})
    const [places,setplaces] = useState([])
    const [follow,setfollow] = useState(true)
    const [allowed,setallowed] = useState(false)
    const [currentCity,setCity] = useState('')
    let map = null
    const dispatch = useDispatch()
    const [drag,setdrag] = useState({})
    const [position, setposition] = useState({
        latitude: 41.429960,
        longitude: -81.696900,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0000
    })

    getCurrentLocation = () => {
        //calling watchID and then if any getting current location details
        if(allowed == false){
            Geolocation.getCurrentPosition(
                pos => {
                    console.log('allowed...',pos)
                    setallowed(true)
                let region = {
                    latitude: parseFloat(pos.coords.latitude),
                    longitude: parseFloat(pos.coords.longitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                    };
                this.map.animateToRegion(region,1000)
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
                        console.log('received pos...',pos)
                    let region = {
                        latitude: parseFloat(pos.coords.latitude),
                        longitude: parseFloat(pos.coords.longitude),
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.000
                    };
                    this.map.animateToRegion(region,1000)
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
                    followUserLocation={true}
                    showsUserLocation={true}
                    showsPointsOfInterest={false}
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
                        //will have controll to move angel based on speed using hooks
                        map.animateCamera(45);
                        map.animateToViewingAngle(180)

                    }}>
                        {places.map((place)=>{
                            return <Marker onPress={()=>alert('Pressed '+place.name)} image={source={uri:place.icon}} coordinate={{latitude: place.geo.lat, longitude: place.geo.lng}}/>
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
            {follow == false ? 
            <View style={{position:'absolute',bottom:0,right:0,marginRight:30,marginBottom:130}}>
                <TouchableOpacity onPress={()=>findUser()} style={{borderWidth:0.5,borderColor:'black',borderRadius:25,height:50,width:50}}>
                    <Text>Find Me</Text>
                </TouchableOpacity>
            </View> : null}
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
    }
})



// {places.length > 0 ?
                    
//     places.map((place)=>{
//         map.animateToBearing(0)
//         map.animateToViewingAngle(180)
//         return <Marker coordinate={{latitude: place.geo.lat, longitude: place.geo.lng}}/>
//     }) : null}
// {position.received == true ? <Marker coordinate={{ latitude: position.latitude, longitude: position.longitude }} /> : null}