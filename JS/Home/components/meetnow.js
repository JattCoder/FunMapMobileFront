import React,{ useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image, Animated } from 'react-native'
import firebase from 'firebase'
import * as geolib from 'geolib'

export default Meetnow = (props) => {

    const [place,setPlace] = useState({})
    const [searching,setSearching] = useState(false)
    const [users,setUsers] = useState([])
    const [removed,setRemoved] = useState([])
    const [centerPlace,setCenterPlace] = useState('')

    letsLook = () => {
        setSearching(true)
        center = geolib.getCenter(users)
        locationStr = ''
        users.forEach(location => {
            if(location.invited) locationStr += locationStr == '' ? `${location.latitude}%2C${location.longitude}` : `%7C${location.latitude}%2C${location.longitude}`
        })
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&destinations=${center.latitude},${center.longitude}&origins=${locationStr}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => { return res.json() })
        .then(data => {
            let count = 0
            if(data.rows.status === 'OK'){
                if(data.destination_addresses[0] == `${center.latitude},${center.longitude}`){
                    //NO RESULTS FOUND
                    //WE WILL WORK ON THIS ISSUE
                    //NO USER IS ABLE TO REACH CENTER POINT.. MOST LIKELY WONT HAPPEN
                }else{
                    bad = []
                    good = []
                    data.rows.elements.forEach(origin => {
                        if(origin.status === 'OK'){
                            destCountry = data.destination_addresses[0].split(', ')
                            origCountry = data.origin_addresses[count].split(', ')
                            if(destCountry[destCountry.length - 1] == origCountry[origCountry - 1]){
                                good.push({
                                    id:users[count].id,
                                    name:users[count].name,
                                    distance:data.rows.elements[count].distance.value,
                                    duration:data.rows.elements[count].duration.value,
                                    message:''
                                })
                            }else{
                                good.push({
                                    id:users[count].id,
                                    name:users[count].name,
                                    distance:data.rows.elements[count].distance.value,
                                    duration:data.rows.elements[count].duration.value,
                                    message:'Requires Visa'
                                })
                            }
                        }else if(origin.status === 'ZERO_RESULTS'){
                            bad.push(users[count])
                        }
                        count += 1
                    })
                    bad.length > 0 ? setRemoved(bad) : null
                }
            }
        })
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
        .then(info => setCenterPlace(info.items[0].address.countryName))
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
            {Object.keys(place).keys.length > 0 ? <View>

            </View> : <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                <Text style={{fontWeight:'bold',fontSize:20}}>Meet Now</Text>
                <ScrollView style={{width:'100%',height:'100%'}}>
                    {users.map(user => {
                        return <View style={{width:'100%',height:'80%',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>select(user)} activeOpacity={1} style={{height:'80%',width:'90%'}}>
                                <Animated.View style={{height:'100%',width:'100%',justifyContent:'center',paddingHorizontal:'5%',flexDirection:'row',alignItems:'center',backgroundColor:user.invited ? '#88d8b0' : 'rgba(0,0,0,0.04)',borderRadius:20}}>
                                    {user.photo != '' ? <Image source={{uri:user.photo}}/> : <View style={{height:50,width:50,borderRadius:50,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:20}}>{user.name[0][0]}</Text>
                                    </View>}
                                    <View style={{width:'80%',height:50,justifyContent:'center',marginLeft:'2%'}}>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:user.invited ? 'white':'black'}}>{user.name}</Text>
                                    <Text style={{fontStyle:'italic',color:'rgba(0,0,0,0.4)'}}>{centerPlace != '' ? centerPlace != user.country ? 'Visa is Required' : 'Drive Safe' : 'No Special Instruction'}</Text>
                                    </View>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
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