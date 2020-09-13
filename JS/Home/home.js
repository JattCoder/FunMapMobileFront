import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Styles from './styles'
import { selmarker } from '../../actions/marker/selmarker'
import { View, TouchableOpacity } from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import Mrker from '../Markers/marker'
import Details from '../Markers/details'
import Location from '../FindMe/location'
import Header from './header'

const Home = (props) => {
    const dispatch = useDispatch()
    const [user, setuser] = useState({})
    const [showme,setshowme] = useState(false)
    const [map,setmap] = useState({})
    const [search,setsearch] = useState([])
    const [position, setposition] = useState({
        latitude: 39.8283,
        longitude: 98.5795,
        latitudeDelta: 40.009,
        longitudeDelta: 40.0009
    })
    const [mapCam,setCam] = useState({
        pitch: 2,
        altitude: 400,
        heading: 0,
        speed: 0
    })
    let lastposition = {
        lat:0.00,
        lng:0.00
    }

    useEffect(() => {
        setuser(props.route.params.user)
    })

    whereAmI = () => {
        map.animateToRegion({latitude:position.latitude,longitude:position.longitude,latitudeDelta:0.039,longitudeDelta:0.039},500)
        setTimeout(()=>{
            setposition({
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.039,
                longitudeDelta: 0.039
            })
        },600)
    }

    useSelector((state)=>{
        let location = state.mylocation
        if(location){
            if(position.latitude != location.latitude && position.longitude != location.longitude){
                setposition({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: position.latitudeDelta,
                    longitudeDelta: position.longitudeDelta
                })
                if(showme == false) {
                    setTimeout(()=>{
                        whereAmI()
                    },500)
                    setshowme(true)
                }
            }
            if(state.marker.name == '' && state.placesearch.length > 0){
                setsearch(state.placesearch)
                if(lastposition.lat == 0.00 && lastposition.lng == 0.00){
                    map.animateToRegion({latitude:position.latitude,longitude:position.longitude,latitudeDelta:0.039,longitudeDelta:0.039},500)
                }else{
                    map.animateToRegion({latitude:lastposition.lat,longitude:lastposition.lng,latitudeDelta:0.039,longitudeDelta:0.039},500)
                }
            }else if(state.marker.name != '' && state.placesearch.length > 0) {
                lastposition.lat = state.marker.lat
                lastposition.lng = state.marker.lng
                map.animateToRegion({latitude:lastposition.lat,longitude:lastposition.lng,latitudeDelta:0.039,longitudeDelta:0.039},500)
            }else if(state.marker.name != ''){
                map.animateToRegion({latitude:state.marker.lat,longitude:state.marker.lng,latitudeDelta:0.019,longitudeDelta:0.019},500)
            }
        }
    })

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <Location />
            <View style={Styles.Page}>
                <MapView showsBuildings
                    ref={ref => { setmap(ref) }}
                    followUserLocation={true}
                    showsUserLocation={showme}
                    showsPointsOfInterest={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    region={position}
                    showsMyLocationButton
                    showsCompass={false}
                    style={{ height: '100%', width: '100%', alignItems: 'center' }}
                    initialRegion={position}>
                        {search.map((place)=>{
                            return <Marker onPress={()=>dispatch(selmarker(place))} coordinate={{latitude: place.geo.lat, longitude: place.geo.lng}}>
                                <Mrker place={place} style={style={width:25,height:35}}/>
                            </Marker>
                        })}
                </MapView>
            </View>
            <View style={{ width: '100%', height:'10%' }}>
                <Header position={position} user={user}/>
            </View>
            <View style={{position:'absolute',bottom:200,right:30,borderWidth:0.5,borderRadius:25,backgroundColor:'white',width:50,height:50}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>whereAmI()}/>
            </View>
            <View style={{position:'absolute',height:'35%',width:'100%',bottom:0,borderTopStartRadius:15,borderTopEndRadius:15}}>
                <Details />
            </View>
        </View>
    )
}

export default Home