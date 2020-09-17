import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Styles from './styles'
import { selmarker } from '../../actions/marker/selmarker'
import { View, TouchableOpacity } from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import Mrker from '../Markers/marker'
import Infowindow from '../Markers/infowindow'
import Details from '../Markers/details'
import Location from '../FindMe/location'
import Header from './header'

const Home = (props) => {
    const dispatch = useDispatch()
    const [user, setuser] = useState({})
    const [showme,setshowme] = useState(false)
    const [followme,setfollowme] = useState(false)
    const [map,setmap] = useState({})
    const [search,setsearch] = useState([])
    const [mrkrInfo,setmrkrInfo] = useState(false)
    const [regionPosition, setRegPosition] = useState({
        latitude: 39.8283,
        longitude: 98.5795,
        latitudeDelta: 40.009,
        longitudeDelta: 40.0009
    })
    const [userPosition,setUserPosition] = useState({
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0
    })

    useEffect(() => {
        setuser(props.route.params.user)
    })

    whereAmI = () => {
        setfollowme(true)
        map.animateToRegion({latitude:userPosition.latitude,longitude:userPosition.longitude,latitudeDelta:0.039,longitudeDelta:0.039},500)
    }

    userLocationChange = (location) => {
        console.log('Location: ',location)
    }

    useSelector((state)=>{
        let location = state.mylocation
        if(location.latitude != 0){
            if(userPosition.latitude != location.latitude || userPosition.longitude != location.longitude){
                setUserPosition({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    accuracy: location.accuracy,
                    altitude: location.altitude,
                    altitudeAccuracy: location.altitudeAccuracy,
                    heading: location.heading,
                    speed: location.speed
                })
                if(showme == false) {
                    setTimeout(()=>{
                        whereAmI()
                    },500)
                    setshowme(true)
                }
            }
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
                <MapView showsBuildings
                    ref={ref => { setmap(ref) }}
                    followsUserLocation={followme}
                    showsUserLocation={showme}
                    onPanDrag={(r)=>{console.log('On Drag: ',r.nativeEvent.coordinate)}}
                    onRegionChangeComplete={(region)=>{setRegPosition(region)}}
                    showsPointsOfInterest={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    region={regionPosition}
                    showsMyLocationButton
                    showsCompass={false}
                    style={{ height: '100%', width: '100%', alignItems: 'center' }}
                    initialRegion={regionPosition}>
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
            <View style={{position:'absolute',bottom:200,right:30,borderWidth:0.5,borderRadius:25,backgroundColor:'white',width:50,height:50}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>whereAmI()}/>
            </View>
            {mrkrInfo == true ? <View style={{position:'absolute',height:'35%',width:'100%',bottom:0,borderTopStartRadius:15,borderTopEndRadius:15}}>
                <Details />
            </View> : null}
        </View>
    )
}

export default Home