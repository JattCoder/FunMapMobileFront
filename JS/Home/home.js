import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Styles from './styles'
import { selmarker } from '../../actions/marker/selmarker'
import { View, TouchableOpacity, Dimensions, Animated, Image } from 'react-native'
import MapView,{Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import Mrker from '../Markers/marker'
import Location from '../FindMe/location'
import Navigate from '../Components/navigation/navigate'
import Drawerr from './drawer'
import Search from './components/search'
import { bottomsheet } from '../../actions/animation/bottomsheet'
import { clearsearch } from '../../actions/submitsearch/clearsearch'
import LinearGradient from 'react-native-linear-gradient'

const dimensions = Dimensions.get('screen')

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
    const [slimit,setspeed] = useState(0)
    const [zoom,setZoom] = useState(0)
    const [currentFamily,setCurrentFamily] = useState([])
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
    const [path,setPath] = useState([])
    const [navActive,setNavActive] = useState(false)
    const [strokeWidth,setStrokeWidth] = useState(6)

    useEffect(() => {
        setuser(props.route.params.user)
    },[props.route.params.user])

    whereAmI = () => {
      if(regionPosition.speed == 0){
        map.animateCamera({center: {
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
        },
        altitude: 500,
        heading: userPosition.heading,
        pitch: userPosition.speed,
        zoom: 17})
      }
      // map.animateToRegion({latitude:state.mylocation.latitude,longitude:state.mylocation.longitude,latitudeDelta:0.019,longitudeDelta:0.019},500)
      setfollowme(true)
      setspeed(0)
    }

    onPanMovement = () => {
      map.getMapBoundaries()
        .then(info => {
          console.warn('Bou: ',info)
        })
        .catch(err => console.warn(err))
    }

    useSelector((state)=>{
        if(state.mapfamily != currentFamily){
          setCurrentFamily(state.mapfamily)
        }
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
            if(regionPosition.speed <= 0 && search.length < 0 && path.length < 0){
              map.animateToRegion({latitude:state.mylocation.latitude,longitude:state.mylocation.longitude,latitudeDelta:0.019,longitudeDelta:0.019},500)
            }
            if(path != state.navigation.path){
              setNavActive(state.navigation.active)
              setPath(state.navigation.path)
              map.fitToCoordinates(state.navigation.path,{animated:true,edgePadding: { top: 5, right: 60, bottom: 220, left: 60 }})
            }else if(state.navigation.active != navActive){
              setNavActive(state.navigation.active)
              setspeed(0)
              if(regionPosition.speed <= 0) 
                map.animateCamera({
                  center: {
                    latitude: regionPosition.latitude,
                    longitude: regionPosition.longitude,
                  },
                  altitude: 500,
                  heading: 0,
                  pitch: 0,
                  zoom: 18,
              })
            }
            if(search != state.placesearch) {
                if(state.placesearch.length > 0) setspeed(2000)
                else if(state.placesearch.length == 0 && slimit == 2000) {
                    map.animateCamera({
                      center: {
                        latitude: regionPosition.latitude,
                        longitude: regionPosition.longitude,
                      },
                    altitude: 500,
                    heading: regionPosition.heading,
                    pitch: regionPosition.speed,
                    zoom: regionPosition.zoom,
                  })
                  setspeed(0)
                }
                setsearch(state.placesearch)
                map.fitToCoordinates(state.placesearch.map(plc=>{return{latitude:plc.location.lat,longitude:plc.location.lng}}),{animated:true,edgePadding: { top: 30, right: 10, bottom: 10, left: 30 }})
                
            }
            if(state.marker.name != '' && mrkrInfo == false){
                map.animateToRegion({latitude:state.marker.location.lat,longitude:state.marker.location.lng,latitudeDelta:0.019,longitudeDelta:0.019},500)
                setmrkrInfo(true)
            }else if(state.marker.name == '' && mrkrInfo == true){
                setmrkrInfo(false)
                map.animateToRegion({latitude:regionPosition.latitude,longitude:regionPosition.longitude,latitudeDelta:0.039,longitudeDelta:0.039},500)
            }
        }
    })

    return (
        <View style={{ height: dimensions.height, width: dimensions.width}}>
            {regionPosition.speed <= 0 ? <Location /> : null}
            <View style={Styles.Page}>
                <MapView provider={PROVIDER_GOOGLE}
                    ref={ref => { setmap(ref) }}
                    paddingAdjustmentBehavior={'always'}
                    onLongPress={()=>alert('Need Urgent Help?')}
                    followsUserLocation={true}
                    showsUserLocation={showme}
                    showsBuildings={true}
                    showsPointsOfInterest={false}
                    onPanDrag={()=> setspeed(2000)}
                    onUserLocationChange={(userlocation)=>{
                        loc = userlocation.nativeEvent.coordinate
                        if(loc.speed > 0 && loc.speed <= 7) setZoom(18.7)
                          else if(loc.speed > 7 && loc.speed <= 30) setZoom(20)
                          else if(loc.speed > 30 && loc.speed <= 65) setZoom(17)
                          else setZoom(16)
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
                        if(loc.speed >= slimit && followme == true){
                          map.animateCamera(
                            {center: {
                              latitude: loc.latitude,
                              longitude: loc.longitude,
                            },
                            altitude: 500,
                            heading: loc.heading,
                            pitch: navActive ? loc.speed+15 : loc.speed,
                            zoom: navActive ? zoom-0.5 : zoom,
                          })
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
                        {path.length > 0 ? <Polyline coordinates={path} strokeColor={'rgba(100,100,200,0.6)'} strokeWidth={strokeWidth} tappable={true} onPress={(e)=>console.warn(e)}/> : null}
                        {userPosition.latitude == 0 ? <Navigate /> : null}
                        {search.map((place)=>{
                            return <Marker onPress={()=>{dispatch(selmarker(place)),dispatch(bottomsheet('Search'))}} coordinate={{latitude: place.location.lat, longitude: place.location.lng}}/>
                        })}
                </MapView>
            </View>
            {showme ? !followme ? <View style={{display:'',position:'absolute',bottom:180,right:30,borderWidth:0.5,borderRadius:25,backgroundColor:'white',width:50,height:50,shadowColor: "#000",shadowOffset: { width: 0,height: 9 }, shadowOpacity: 0.48, shadowRadius: 11.95, elevation: 18}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>whereAmI()}/>
            </View>: null : null}
            <View style={{height:55,position:'absolute',right:'1%',top:'8%'}}>
              <Search position={regionPosition} user={props.route.params.user}/>
            </View>
            <View style={{width:dimensions.width,bottom:0,position:'absolute'}}>
              <Drawerr user={user} regionPosition={regionPosition} followMe={()=>whereAmI()} logout={props.navigation}/>
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
