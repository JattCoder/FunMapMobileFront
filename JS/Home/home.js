import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Styles from './styles'
import { selmarker } from '../../actions/marker/selmarker'
import { View, TouchableOpacity } from 'react-native'
import MapView,{Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Mrker from '../Markers/marker'
import Details from '../Markers/details'
import Location from '../FindMe/location'
import Navigate from '../Components/navigation/navigate'
import Locationame from '../FindMe/locationame'
import Header from './header'
import Bottom from './bottom'

const Home = (props) => {
    const dispatch = useDispatch()
    const [user, setuser] = useState({})
    //this will turn on when getting location to be true from redux
    const [showme,setshowme] = useState(false)
    //this will be handled when pressed a button
    const [followme,setfollowme] = useState(false)
    const [map,setmap] = useState({})
    const [search,setsearch] = useState([])
    const [mrkrInfo,setmrkrInfo] = useState(false)
    const [slimit,setspeed] = useState(10)
    const [regionPosition, setRegPosition] = useState({
        latitude: 0,
        longitude: 0,
        speed: 0,
        heading: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        accuracy: 0,
        complete: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        message: ''
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
    let speed = 0

    useEffect(() => {
        setuser(props.route.params.user)
    })

    whereAmI = () => {
      setfollowme(true)
      setspeed(1)
      map.animateCamera({center: {
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
      },
      altitude: 500,
      heading: userPosition.heading,
      pitch: userPosition.speed,
      zoom: 18})
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
                    followsUserLocation={true}
                    showsUserLocation={showme}
                    showsBuildings={true}
                    showsPointsOfInterest={false}
                    onPanDrag={()=> {if(speed > slimit){
                      alert('You can not use this app while driving')
                    }}}
                    onUserLocationChange={(userlocation)=>{
                        loc = userlocation.nativeEvent.coordinate
                        speed = loc.speed
                        zoom = 0
                        if(loc.speed > slimit){
                          if(followme == true){
                            if(loc.speed > 10 && loc.speed <= 30) zoom = 18
                            else if(loc.speed > 30 && loc.speed <= 65) zoom = 17
                            else zoom = 16
                            map.animateCamera({center: {
                              latitude: loc.latitude,
                              longitude: loc.longitude,
                            },
                            altitude: 500,
                            heading: loc.heading,
                            pitch: loc.speed,
                            zoom: zoom})
                            setRegPosition({
                              latitude: loc.latitude,
                              longitude: loc.longitude,
                              speed: loc.speed,
                              heading: loc.heading,
                              altitude: loc.altitude,
                              altitudeAccuracy: loc.altitudeAccuracy,
                              accuracy: loc.accuracy,
                              complete: '',
                              street: '',
                              city: '',
                              state: '',
                              zip: ''
                            })
                          }
                        }
                    }}
                    customMapStyle={mapStyle}
                    style={{ height: '100%', width: '100%'}}
                    initialRegion={{
                      latitude:regionPosition.latitude,
                      longitude:regionPosition.longitude,
                      latitudeDelta: 100.009,
                      longitudeDelta: 20.0009,
                    }}>
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
            {showme == true ? <View style={{display:'',position:'absolute',bottom:180,right:30,borderWidth:0.5,borderRadius:25,backgroundColor:'white',width:50,height:50,shadowColor: "#000",shadowOffset: { width: 0,height: 9 }, shadowOpacity: 0.48, shadowRadius: 11.95, elevation: 18}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>whereAmI()}/>
            </View> : null}
            <View style={{position:'absolute',bottom:0,width:'100%',height:'14%',shadowColor: "#000",shadowOffset: { width: 0,height: 9 }, shadowOpacity: 0.48, shadowRadius: 11.95, elevation: 18,}}>
                <Bottom user={user} position={regionPosition}/>
            </View>
            {mrkrInfo == true ? <View style={{position:'absolute',height:'35%',width:'100%',bottom:0,borderTopStartRadius:15,borderTopRightRadius:15}}>
                <Details />
            </View> : null}
        </View>
    )
}

export default Home


const mapStyle = [
    {
      elementType: "geometry",
      stylers: [{ color: "#E8E8E8" }]
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#0b0e0f" }]
    },
    {
      featureType: "points of interest",
      elementType: "visibility",
      stylers: [{ color: "off"}]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#FFFFFF" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#FFFFFF" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#FFFFFF" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#505050" }]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#e1f5fe" }]
      },
  ];
