import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mylocation from '../../../actions/mylocation/mylocation'
import Geocoder from 'react-native-geocoder-reborn'
import firebase from 'firebase'
import Checkbattery from './checkbattery'
import { View, Text, Image } from 'react-native'

export default Bottomweather = (props) => {

    const[currentCity,setcurrentCity] = useState('')
    const[wther,setweather] = useState({
        temp:0,
        icon:''
    })
    const[message,setmessage] = useState('')
    const[fams,setFams] = useState([])
    const[id,setID] = useState(-1)
    const dispatch = useDispatch()
    let city = ''
    let date = new Date().getHours()

    useSelector((state)=>{
        if(fams != state.family && currentCity != ''){
            setFams(state.family)
            setID(state.login.message.id)
        }
    })

    useEffect(()=>{
        geocode()
    },[props.position.latitude,props.position.longitude])

    updateLocation = () => {
        fams.length > 0 && id != -1 ? fams.map((fam)=>{
            firebase.database().ref(`FamilyGroups/${fam[0].id}/${id}`).update({
                location: currentCity,
                heading: position.heading,
                latitude: props.position.latitude,
                longitude: props.position.longitude,
                speed: position.speed
            })
        }) : null
    }

    geocode = () => {
        let Geo = {
            lat: props.position.latitude,
            lng: props.position.longitude
        }
        Geocoder.geocodePosition(Geo).then(res => {
            if(props.position.latitude != 0 && props.position.longitude != 0){
                position = props.position
                location = ''
                if(res[0].streetname != null) location += res[0].streetname + ', '
                if(res[0].locality != null) location += res[0].locality + ', '
                if(res[0].adminArea != null) location += res[0].adminArea + ' '
                if(res[0].postalCode != null) location += res[0].postalCode
                if(currentCity != location){
                    setcurrentCity(location)
                    if(res[0].locality != city){
                        city = res[0].locality
                        updateLocation()
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=726db19d90971027a329515b851bfddc`)
                        .then(res => {return res.json()})
                        .then(data => {
                            setweather({
                                temp: Math.round((parseInt(data.main.temp)-273.15)*9/5+32),
                                icon: data.weather[0].icon
                            })
                        })
                        .catch(err => console.log('Weather Error: ',err.message))
                    }
                }
            }else{
                setweather({temp: 'N/A', icon: ''})
                setcurrentCity('No Location Info')
                {fams.length > 0 && id != -1 ? fams.map((fam)=>{
                    firebase.database().ref(`FamilyGroups/${fam[0].id}/${id}`).update({
                        location: `Location Disabled`,
                        heading:0,
                        latitude:0,
                        longitude:0,
                        speed:0
                    })
                }) : null}
            }
        }).catch(err => console.log(err))
    }

    return(
        <View>
            <Checkbattery />
            {currentCity != '' ? <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                <View style={{left:0,width:'77%'}}>
                    <Text style={{fontSize:20,color:'white'}}>{props.name}</Text>
                    <Text style={{color:'white'}}>{currentCity}</Text>
                </View>
                <View style={{right:0,top:0,alignItems:'center'}}>
                    {wther.icon == '' ? date < 18 ? <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:35,width:35}} source={require('../../weather/01d.png')}/>
                        <Text style={{color:'white'}}>{wther.temp}</Text>
                    </View> : <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:35,width:35}} source={require('../../weather/01d.png')}/>
                        <Text style={{color:'white'}}>{wther.temp}</Text>
                    </View> : null}
                    {wther.icon != '' ? <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:35,width:35}} source={{uri: `http://openweathermap.org/img/wn/${wther.icon}@2x.png`}}/>
                        <Text style={{color:'white'}}>{wther.temp} F</Text>
                    </View>:null}
                </View>
            </View> : null}
        </View>
    )
}