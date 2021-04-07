import React,{ useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import * as geolib from 'geolib'

export default Meetnow = (props) => {

    const [place,setPlace] = useState({})
    const [searching,setSearching] = useState(false)
    const [memLocations,setMemLocations] = useState([])

    letsLook = () => {
        setSearching(true)
        center = geolib.getCenter(memLocations)
    }

    getMembersLocation = (members) => {
        locations = []
        members.map(memberID => {
            firebase.database().ref('Users/'+memberID).once('value',info => {
                locations.push({
                    latitude:info.child('location').child('geo').child('latitude').val(),
                    longitude:info.child('location').child('geo').child('longitude').val()
                })
            })
        })
        setMemLocations(locations)
    }

    useEffect(()=>{
        getMembersLocation(props.members)
    },[props])

    return(
        <View style={{height:'100%',width:'100%'}}>
            {Object.keys(place).keys.length > 0 ? <View>

            </View> : <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                <Text style={{position:'absolute',top:0,marginTop:'10%',fontWeight:'bold',fontSize:20}}>Meet Now</Text>
                <Text style={{marginTop:'10%'}}>FunMap will find a location in a equal distance to all members in this group</Text>
                <TouchableOpacity disabled={searching} onPress={()=>letsLook()} style={{paddingVertical:'4%',paddingHorizontal:'20%',borderWidth:2,borderRadius:50,marginTop:'20%'}}>
                    {!searching ? <Text>Find Location</Text> : <ActivityIndicator />}
                </TouchableOpacity>
            </View>}
        </View>
    )
}