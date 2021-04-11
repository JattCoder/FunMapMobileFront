import React,{ useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image, Animated } from 'react-native'
import NowPlaces from './nowPlaces'
import firebase from 'firebase'
import * as geolib from 'geolib'

export default Meetnow = (props) => {

    const [places,setPlaces] = useState([])
    const [searching,setSearching] = useState(false)
    const [users,setUsers] = useState([])
    const [removed,setRemoved] = useState([])
    const [centerPlace,setCenterPlace] = useState({country:'',geo:{latitude:0,longitude:0}})

    funnyQuotes = () => {
        quotes = ['Next Time, Plan ahead of time','Drive Me There','Grab Me A Coffee','Grab Me Pizza','Dont go without me','Invite Me']
        return quotes[Math.floor(Math.random()*quotes.length-1)+1]
    }

    fetchInfo = () => {
        setSearching(true)
        let types = ['cafe','restaurant']
        let locationPack = []
        types.map(type => {
            fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?type=${type}&location=${centerPlace.geo.latitude},${centerPlace.geo.longitude}&radius=10000&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
            .then(res => {return res.json()})
            .then(result => {
                result.results.map(place => {
                    locationPack.push({
                        name: place.name,
                        status: place.business_status,
                        address: place.formatted_address,
                        location: place.geometry.location,
                        open: place.opening_hours ? place.opening_hours.open_now : null,
                        placeID: place.place_id,
                        priceLevel: place.price_level ? place.price_level : null,
                        rating : place.rating,
                        types: place.types,
                        photos: place.photos ? place.photos : []
                    })
                })
                setPlaces(locationPack)
            })
            .catch(err => console.warn(err))
        })
    }

    letsLook = () => {
        users.filter(usr => {
            return usr.invited && usr.id == props.myId ? true : false
        }).length > 0 ? fetchInfo() : alert('Please select 1 or more members')
        
    }

    getMembersLocation = (members) => {
        user = []
        members.map(memberID => {
            firebase.database().ref('Users/'+memberID).once('value',info => {
                user.push({
                    id:info.child('id').val(),
                    name:info.child('name').val(),
                    photo:info.child('photo').val(),
                    latitude:info.child('location').child('geo').child('latitude').val(),
                    longitude:info.child('location').child('geo').child('longitude').val(),
                    country:info.child('location').child('country').val(),
                    reachable:false,
                    invited:false
                })
            })
        })
        setUsers(user)
    }

    findCenter = (usrs) => {
        center = geolib.getCenter(usrs.map(usr => {return {latitude:usr.latitude,longitude:usr.longitude}}))
        fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${center.latitude}%2C${center.longitude}&lang=en-US&apikey=tOzyGAv3qnNge0QzSmXnwD54zKsR4xCZY3M5yMC22OM`)
        .then(res => {return res.json()})
        .then(info => setCenterPlace({country:info.items[0].address.countryName,geo:center}))
        .catch(err => console.log(err))
    }

    select = (user) => {
        updatedUsers = []
        users.map(usr => {
            if(usr.id === user.id) usr.invited = usr.invited ? false : true
            updatedUsers.push(usr)
        })
        setUsers(updatedUsers)
        findCenter(updatedUsers)
    }

    useEffect(()=>{
        getMembersLocation(props.members)
    },[props])

    return(
        <View style={{height:'100%',width:'100%',borderRadius:20}}>
            {places.length > 0 ? <View>
                <NowPlaces places={places}/>
            </View> : <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                <Text style={{fontWeight:'bold',fontSize:20}}>Meet Now</Text>
                <ScrollView style={{width:'100%',height:'100%'}}>
                    {users.map(user => {
                        return user.id == props.myId ? <View style={{width:'100%',height:'80%',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>select(user)} activeOpacity={1} style={{height:'80%',width:'90%'}}>
                            <Animated.View style={{height:'100%',width:'100%',justifyContent:'center',paddingHorizontal:'5%',flexDirection:'row',alignItems:'center',backgroundColor:user.invited ? '#88d8b0' : 'rgba(0,0,0,0.04)',borderRadius:20}}>
                                {user.photo != '' ? <Image source={{uri:user.photo}}/> : <View style={{height:50,width:50,borderRadius:50,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:20}}>{user.name[0][0]}</Text>
                                </View>}
                                <View style={{width:'80%',height:50,justifyContent:'center',marginLeft:'2%'}}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{fontSize:20,fontWeight:'bold',color:user.invited ? 'white':'black'}}>{user.name}</Text>
                                        <Text style={{fontSize:15,fontStyle:'italic',color:user.invited ? 'white':'black',color:'rgba(0,0,0,0.4)'}}>{` - ${user.country}`}</Text>
                                    </View>
                                    <Text style={{fontStyle:'italic',color:'rgba(0,0,0,0.4)'}}>{centerPlace.country != '' ? centerPlace.country != user.country ? 'Visa is Required' : funnyQuotes() : funnyQuotes()}</Text>
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    </View> : null
                    })}
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity  onPress={()=>letsLook()} style={{width:'60%',height:'55%',borderWidth:2,borderRadius:50,marginTop:'10%',justifyContent:'center',alignItems:'center'}}>
                            {!searching ? <Text>Find Location</Text> : <ActivityIndicator />}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>}
        </View>
    )
}