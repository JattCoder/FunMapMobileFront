import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mylocation } from '../../../actions/mylocation/mylocation'
import Geocoder from 'react-native-geocoder-reborn'
import firebase from 'firebase'
import Checkbattery from './checkbattery'
import { View, Text, Image } from 'react-native'
import Weathericon from './weathericon'
import History from '../../Home/components/history'

export default Bottomweather = (props) => {

    const[currentCity,setcurrentCity] = useState('')
    const[wther,setweather] = useState({
        temp:0,
        icon:''
    })
    const[temp,setTemp] = useState('F°')
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
        if(temp != state.settings.temperature) setTemp(state.settings.temperature)
    })

    useEffect(()=>{
        geocode()
    },[props.position.latitude,props.position.longitude])

    updateLocation = (location,res) => {
        fams.length > 0 && id != -1 ? fams.map((fam)=>{
            dispatch(mylocation({
                latitude: props.position.latitude,
                longitude: props.position.longitude,
                speed: props.position.speed,
                heading: props.position.heading,
                altitude: props.position.altitude,
                altitudeAccuracy: props.position.altitudeAccuracy,
                accuracy: props.position.accuracy,
                complete: location,
                street: res.streetName,
                city: res.locality,
                state: res.adminArea,
                zip: res.postalCode,
                permitted: true,
                message: ''
            }))
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
                if(res[0].streetName != null) location += res[0].streetName + ', '
                if(res[0].locality != null) location += res[0].locality + ', '
                if(res[0].adminArea != null) location += res[0].adminArea + ' '
                if(res[0].postalCode != null) location += res[0].postalCode
                if(currentCity != location){
                    setcurrentCity(location)
                    updateLocation(location,res[0])
                    if(res[0].locality != city){
                        city = res[0].locality
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=726db19d90971027a329515b851bfddc`)
                        .then(res => {return res.json()})
                        .then(data => {
                            if(temp == 'F°'){
                                setweather({
                                    temp: Math.round((parseInt(data.main.temp)-273.15)*9/5+32)+' '+temp,
                                    icon: data.weather[0].icon
                                })
                            }else if(temp == 'C°'){
                                setweather({
                                    temp: Math.round(parseInt(data.main.temp)-273.15)+' '+temp,
                                    icon: data.weather[0].icon
                                })
                            }
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
            {/* <History current={{lat: props.position.latitude, lng: props.position.longitude}} city={currentCity} speed={props.position.speed}/> */}
            <Checkbattery />
            {currentCity != '' ? <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                <View style={{left:0,width:'77%'}}>
                    <Text style={{fontSize:20,color:'#7F7FD5'}}>{props.name}</Text>
                    <Text style={{color:'#7F7FD5'}}>{currentCity}</Text>
                </View>
                <View style={{right:0,top:0,alignItems:'center'}}>
                    {wther.icon == '' ? date < 18 ? <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:35,width:35}} source={require('../../weather/01d.png')}/>
                        <Text style={{color:'#7F7FD5'}}>{wther.temp}</Text>
                    </View> : <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:35,width:35}} source={require('../../weather/01d.png')}/>
                        <Text style={{color:'#7F7FD5'}}>{wther.temp}</Text>
                    </View> : null}
                    {wther.icon != '' ? <View style={{justifyContent:'center',alignItems:'center'}}>
                        {<Weathericon icon={wther.icon}/>}
                        <Text style={{color:'#7F7FD5'}}>{wther.temp}</Text>
                    </View>:null}
                </View>
            </View> : null}
        </View>
    )
}