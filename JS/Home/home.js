import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Text } from 'react-native'
import { clearsearch } from '../../actions/submitsearch/clearsearch'
import Uimage from './uimage'
import MapView, { Marker } from 'react-native-maps';
import Search from '../Components/search/search'
import Geolocation from '@react-native-community/geolocation'
import { Myposition } from '../Components/location/myposition'

const Home = (props) => {
    const [user, setuser] = useState({})
    const [places,setplaces] = useState([])
    const dispatch = useDispatch()
    const [position, setposition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    let map = null

    getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            pos => {
            let region = {
                latitude: parseFloat(pos.coords.latitude),
                longitude: parseFloat(pos.coords.longitude),
                latitudeDelta: 5,
                longitudeDelta: 5
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

    useEffect(() => {
        setuser(props.route.params.user)
        getCurrentLocation()
    })

    useSelector((state)=>{
        if(state.placesearch.length > 0){
            setplaces(state.placesearch)
            console.log('Got Places here...',state.placesearch)
            dispatch(clearsearch())
        }
    })

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
                    //onUserLocationChange={position.latitude,position.longitude}
                    //onMapReady={map.fitToSuppliedMarkers()}
                    style={{ height: '100%', width: '100%', alignItems: 'center' }}
                    initialRegion={position}
                    onLayout={() => {
                        map.animateToBearing(0);
                        map.animateToViewingAngle(30);
                    }}>
                        {places.map((place)=>{
                            return <Marker coordinate={{latitude: place.geo.lat, longitude: place.geo.lng}}/>
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