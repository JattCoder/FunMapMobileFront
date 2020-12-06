import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mylocation } from '../../../actions/mylocation/mylocation'
import Geocoder from 'react-native-geocoder-reborn'
import firebase from 'firebase'
import Checkbattery from './checkbattery'
import { View, Text, Image } from 'react-native'
import Weathericon from './weathericon'
import History from '../../Home/components/history'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export default Bottomweather = (props) => {

    const[currentCity,setcurrentCity] = useState('')
    const[wther,setweather] = useState({
        temp:0,
        icon:''
    })
    const[temp,setTemp] = useState('F°')
    const[fams,setFams] = useState([])
    const[email,setEmail] = useState('')
    const dispatch = useDispatch()
    let city = ''
    let date = new Date().getHours()

    useSelector((state)=>{
        if(fams != state.family && currentCity != ''){
            setFams(state.family)
            setEmail(props.email)
        }
        if(temp != state.settings.temperature) setTemp(state.settings.temperature)
    })

    useEffect(()=>{
        geocode()
    },[props.position.latitude,props.position.longitude])

    updateLocation = (location,res) => {
        //Unblock this code to update user location
        //Object.keys(fams).length > 0 && email != '' ? updateGroups(location) : null
    }

    updateGroups = (location) => {
        for(let fam in fams){
            firebase.database().ref('FamilyGroups/'+fams[fam].ID+'/Members/'+email.replace(punctuation,'').replace(spaceRE,'')).update({
                address: location,
                latitude: props.position.latitude,
                longitude: props.position.longitude,
                speed: props.position.speed,
                heading: props.position.heading
            })
        }
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
                updateLocation(location,res[0])
                if(currentCity != location){
                    setcurrentCity(location)
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
            {email != '' ? <Checkbattery email={email}/> : null}
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