import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Styles from './styles'
import { selmarker } from '../../actions/marker/selmarker'
import { View, TouchableOpacity, Image } from 'react-native'
import MapView,{Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Mrker from '../Markers/marker'
import Infowindow from '../Markers/infowindow'
import Details from '../Markers/details'
import Location from '../FindMe/location'
import Navigate from '../Components/navigation/navigate'
import Header from './header'

const Home = (props) => {
    const dispatch = useDispatch()
    const [user, setuser] = useState({})
    //this will turn on when getting location to be true from redux
    const [showme,setshowme] = useState(false)
    const [showmeButton,setshowmeButton] = useState('')
    //this will be handled when pressed a button
    const [followme,setfollowme] = useState(false)
    const [map,setmap] = useState({})
    const [search,setsearch] = useState([])
    const [mrkrInfo,setmrkrInfo] = useState(false)
    const [angle,setangle] = useState(0)
    const [regionPosition, setRegPosition] = useState({
        latitude: 39.8283,
        longitude: 98.5795,
        latitudeDelta: 40.009,
        longitudeDelta: 20.0009
    })
    const [userPosition,setUserPosition] = useState({
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
    })

    useEffect(() => {
        setuser(props.route.params.user)
    })

    whereAmI = () => {
        setfollowme(true)
        map.animateToRegion({latitude:userPosition.latitude,longitude:userPosition.longitude,latitudeDelta:0.039,longitudeDelta:0.039},500)
        setTimeout(()=>{
          setshowmeButton('none')
        },600)
    }

    regChange = (newlocation) => {
        setshowmeButton('')
        setRegPosition({
          latitude: newlocation.latitude,
          longitude: newlocation.longitude,
          latitudeDelta: newlocation.latitudeDelta,
          longitudeDelta: newlocation.longitudeDelta
      })
    }

    useSelector((state)=>{
        if(state.mylocation.latitude != 0 && followme == false){
          setUserPosition({
            latitude: state.mylocation.latitude,
            longitude: state.mylocation.longitude,
            accuracy: state.mylocation.accuracy,
            altitude: state.mylocation.altitude,
            altitudeAccuracy: state.mylocation.altitudeAccuracy,
            heading: state.mylocation.heading,
            speed: state.mylocation.speed,
          })
          setshowme(true)
          whereAmI()
        }
        if(followme == true){
            if(state.placesearch.length > 0) {
                setsearch(state.placesearch)
            }
            if(state.marker.name != '' && mrkrInfo == false){
                map.animateToRegion({latitude:state.marker.lat,longitude:state.marker.lng,latitudeDelta:0.019,longitudeDelta:0.019},500)
                setmrkrInfo(true)
            }else if(state.marker.name == '' && mrkrInfo == true){
                setmrkrInfo(false)
                map.animateToRegion({latitude:regionPosition.latitude,longitude:regionPosition.longitude,latitudeDelta:0.039,longitudeDelta:0.039},500)
            }
        }
    })

    return (
        <View style={{ height: '100%', width: '100%' }}>
            {showme == false ? <Location /> : null}
            <View style={Styles.Page}>
                <MapView provider={PROVIDER_GOOGLE}
                    ref={ref => { setmap(ref) }}
                    showsUserLocation={showme}
                    followsUserLocation={followme}
                    showsTraffic={false}
                    onUserLocationChange={(userlocation)=>{
                        loc = userlocation.nativeEvent.coordinate
                        if(loc.speed == 0){
                          setangle(0)
                        }else if(loc.speed < 21){
                          setangle(20)
                        }else if(loc.speed < 41){
                          setangle(40)
                        }else if(loc.speed < 100){
                          setangle(90)
                        }
                        map.animateCamera({center: {
                          latitude: loc.latitude,
                          longitude: loc.longitude,
                        },
                        heading: loc.heading,
                        pitch: angle,
                        zoom: 18})
                    }}
                    onRegionChange={(newlocation)=>regChange(newlocation)}
                    customMapStyle={mapStyle}
                    style={{ height: '100%', width: '100%'}}
                    initialRegion={regionPosition}>
                        {userPosition.latitude == 0 ? <Navigate /> : null}
                        {search.map((place)=>{
                            return <Marker key={place.id} style={{justifyContent:'center',alignItems:'center'}} onPress={()=>dispatch(selmarker(place))} coordinate={{latitude: place.geo.lat, longitude: place.geo.lng}}>
                                {/* <Infowindow place={place}/> */}
                                <Mrker place={place} style={style={width:25,height:35}}/>
                            </Marker>
                        })}
                </MapView>
            </View>
            <View style={{ width: '100%', height:'10%' }}>
                <Header position={regionPosition} user={user}/>
            </View>
            <View style={{display:showmeButton,position:'absolute',bottom:200,right:30,borderWidth:0.5,borderRadius:25,backgroundColor:'white',width:50,height:50}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>whereAmI()}/>
            </View>
            {mrkrInfo == true ? <View style={{position:'absolute',height:'35%',width:'100%',bottom:0,borderTopStartRadius:15,borderTopEndRadius:15}}>
                <Details />
            </View> : null}
        </View>
    )
}

export default Home


const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#039be5"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#01579b",
        }
      ]
    },
    // ...
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#e1f5fe" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#81d4fa" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#81d4fa" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#81d4fa" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "rgba(100, 100, 100, 0.5)" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "rgba(100, 100, 100, 0.5)" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "rgba(100, 100, 100, 0.5)" }]
      },
    {
        featureType: "Street",
        elementType: "geometry.fill",
        stylers: [
            {
                color: '#FFFFFF'
            }
        ]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#e1f5fe"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#29b6f6"
        }
      ]
    }
  ];
