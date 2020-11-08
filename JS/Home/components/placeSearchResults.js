import React,{ useState } from 'react'
import { View, Text, Dimensions, ScrollView, Image, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { clearsearch } from '../../../actions/submitsearch/clearsearch'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ResultsIcon from '../../Components/resultsIcon/resultsIcon'
import LinearGradient from 'react-native-linear-gradient'

export default PlaceSearcgResults = () => {

    const [places,setPlaces] = useState([])
    const [myPos,setMyPos] = useState({
        lat:0,
        lng:0
    })
    const dispatch = useDispatch() 

    useSelector((state)=>{
        if(state.placesearch.length > 0){
            setPlaces(state.placesearch)
            dispatch(clearsearch())
        }
        //latitude": 37.39248364, "longitude":
        if(myPos.lat != state.mylocation.latitude && myPos.lng != state.mylocation.longitude){
            setMyPos({
                lat: state.mylocation.latitude,
                lng: state.mylocation.longitude
            })
        }
    })

    // {"address": "10110 N De Anza Blvd, Cupertino, CA 95014, United States",
    //  "geo": {"lat": 37.3245611, "lng": -122.0313944},
    //   "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/worship_general-71.png",
    //    "id": "0", "name": "Saint Joseph of Cupertino Parish",
    //     "placeid": "ChIJ0wTIbK61j4ARHH-5GLpV864", "rating": 4.3,
    //      "status": false,
    //       "types": ["church", "place_of_worship", "school", "point_of_interest", "establishment"]}

    return(
        <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/1.5,alignItems:'center'}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{width:'95%',height:'100%',marginVertical:'5%',borderRadius:10,borderWidth:0.5,borderColor:'white'}}>
                {places.map((place)=>{
                   return <TouchableOpacity key={place.id} onPress={()=>console.warn(place)} style={Styles.Item}>
                        <View style={{width:'15%'}}>
                            <ResultsIcon icon={place.icon} rating={place.rating} geo={place.geo} mygeo={myPos}/>
                        </View>
                        <View style={{marginLeft:'2%'}}>
                            <Text style={{fontWeight:'bold',fontSize:15,color:'white',width:Dimensions.get('window').width/1.4}}>{place.name}</Text>
                            <Text style={{fontSize:13,color:'white',width:Dimensions.get('window').width/1.4}}>{place.address}</Text>
                        </View>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    )
}

const Styles = StyleSheet.create({
    Outer:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:'1%',
        marginHorizontal:'1%',
    },
    Item:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:15,
        borderWidth:0.5,
        borderStartColor:'white',
        marginVertical:'1%',
        shadowColor:'white',
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 50,
    }
})