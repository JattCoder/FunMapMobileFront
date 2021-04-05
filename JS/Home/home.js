import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Styles from './styles'
import { selmarker } from '../../actions/marker/selmarker'
import { View, Dimensions } from 'react-native'
import MapView,{Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import Location from '../FindMe/location'
import Drawerr from './drawer'
import Search from './components/search'
import polyline from '@mapbox/polyline'
import SearchMarker from './components/searchMarker'
import DestinationIcon from './components/destinationIcon'

const dimensions = Dimensions.get('screen')

const Home = (props) => {
    const dispatch = useDispatch()
    const [user, setuser] = useState({})
    const [map,setmap] = useState({})
    const [search,setsearch] = useState([])
    const [navigation,setNavigation] = useState({path:[],active:false})
    const [freeSearch,setFreeSearch] = useState(false)
    const [selectedPlace,setSelectedPlace] = useState('')
    const [regionPosition, setRegPosition] = useState({
        latitude: 0,
        longitude: 0,
        speed: 0,
        heading: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        accuracy: 0,
        message: ''
    })

    useEffect(() => {
        setuser(props.user)
    },[props.user])

    getLocation = (mylocation) => {
      setRegPosition({
        latitude: mylocation.latitude,
        longitude: mylocation.longitude,
        accuracy: mylocation.accuracy,
        altitude: mylocation.altitude,
        altitudeAccuracy: mylocation.altitudeAccuracy,
        heading: mylocation.heading,
        speed: mylocation.speed,
      })
    }
    
    useSelector((state)=>{
        if(Object.keys(map).length > 0){
          if(navigation.path != state.navigation.path || navigation.active != state.navigation.active){
            if(state.navigation.active && state.marker.placeid != '') dispatch(selmarker({}))
            setTimeout(()=>{
              !navigation.active ? 
                map.fitToCoordinates(state.navigation.path,{animated:true,edgePadding: { top: dimensions.height/4, right: 60, bottom: dimensions.height/2, left:60 }})
              : regionPosition.speed <= 0 ? 
                map.animateCamera({center: { latitude: regionPosition.latitude, longitude: regionPosition.longitude,},altitude: regionPosition.altitude,heading: regionPosition.heading ,pitch: 0,zoom: 17,}) 
              : null
            },500)


            
            setNavigation({path:state.navigation.path,active:state.navigation.active})
          }else if(search != state.placesearch){
              if(state.placesearch.length > 0)
                setTimeout(()=>{
                  map.fitToCoordinates(state.placesearch.map(plc=>{return{latitude:plc.location.lat,longitude:plc.location.lng}}),{animated:true,edgePadding: { top: 30, right: 10, bottom: 10, left: 30 }})
                },500)
              setsearch(state.placesearch)
          }else if(state.marker.placeid != selectedPlace){
              if(state.marker.placeid != '')
                setTimeout(()=>{
                  map.animateToRegion({latitude:state.marker.location.lat,longitude:state.marker.location.lng,latitudeDelta:0.019,longitudeDelta:0.019},500)
                },500)
              setSelectedPlace(state.marker.placeid)
          }else if(regionPosition.latitude == 0 && regionPosition.longitude == 0 && state.mylocation.message == 'Allowed'){
            getLocation(state.mylocation)
            map.animateCamera({center: { latitude: state.mylocation.latitude, longitude: state.mylocation.longitude,},altitude: 500,heading: 0,pitch: 0,zoom: 17,})
          }
        }
    })
    
    return (
        <View style={{ height: dimensions.height, width: dimensions.width}}>
            <Location position={regionPosition}/>
            <View style={Styles.Page}>
                <MapView provider={PROVIDER_GOOGLE}
                    ref={ref => { setmap(ref) }}
                    paddingAdjustmentBehavior={'always'}
                    onLongPress={()=>alert('Need Urgent Help?')}
                    followsUserLocation={search.length > 0 ? false : navigation.path.length > 0 && navigation.active ? true : freeSearch ? false : true}
                    showsUserLocation={regionPosition.latitude != 0 && regionPosition.longitude != 0 ? true : false}
                    showsBuildings={true}
                    showsPointsOfInterest={false}
                    onPanDrag={()=>setFreeSearch(true)}
                    onUserLocationChange={(userlocation)=>{
                        loc = userlocation.nativeEvent.coordinate
                        setRegPosition({
                          latitude: loc.latitude,
                          longitude: loc.longitude,
                          accuracy: loc.accuracy,
                          altitude: loc.altitude,
                          altitudeAccuracy: loc.altitudeAccuracy,
                          heading: loc.heading,
                          speed: loc.speed,
                        })
                            map.animateCamera(
                              {center: {
                                latitude: loc.latitude,
                                longitude: loc.longitude,
                              },
                              altitude: 500,
                              heading: loc.heading,
                              pitch: 0,
                              zoom: 17,
                            })
                    }}
                    customMapStyle={mapStyle}
                    style={{ height: '100%', width: '100%'}}
                    initialRegion={{
                      latitude:regionPosition.latitude,
                      longitude:regionPosition.longitude,
                      latitudeDelta: 100.009,
                      longitudeDelta: 20.0009,
                    }}>
                        {navigation.path.length > 0 ? <Marker coordinate={{latitude: navigation.path[navigation.path.length-1].latitude, longitude: navigation.path[navigation.path.length-1].longitude}}>
                            <DestinationIcon pathLength={navigation.path.length} active={navigation.active}/>
                        </Marker> : null}
                        {navigation.path.length > 0 ? 
                          <Polyline coordinates={navigation.path} strokeColor={'#2C5364'} geodesic={true} strokeWidth={7} tappable={true} onPress={(e)=>console.warn(e)}/>
                        : null}
                        {search.map((place)=>{
                            return <Marker onPress={()=>dispatch(selmarker(place))} coordinate={{latitude: place.location.lat, longitude: place.location.lng}}>
                                <SearchMarker plc={place}/>
                            </Marker>
                        })}
                </MapView>
            </View>
            <View style={{height:55,position:'absolute',right:'1%',top:'8%'}}>
              <Search position={regionPosition} user={props.user}/>
            </View>
            <View style={{width:dimensions.width,bottom:0,position:'absolute'}}>
              <Drawerr user={user} position={regionPosition} logout={props.navigation}/>
            </View>
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
