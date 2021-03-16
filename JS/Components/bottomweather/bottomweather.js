import React,{ useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Checkbattery from './checkbattery'
import { View, Text, Image } from 'react-native'
import Weathericon from './weathericon'
import History from '../../Home/components/history'
import Geocoder from 'react-native-geocoder-reborn'

export default Bottomweather = (props) => {

    const[wther,setweather] = useState({ temp:0, icon:''})
    const[position,setPosition] = useState({latitude:0,longitude:0})
    const[currentCity,setCurrentCity] = useState('')
    const[temp,setTemp] = useState('F°')
    const[email,setEmail] = useState('')
    let date = new Date().getHours()

    getWeather = () => {
        console.warn(props.position)
        Geocoder.geocodePosition(props.position).then(res => {
            setCurrentCity({city:res[0].locality,display:`${res[0].streetName != null ? res[0].streetName+', ':null}${res[0].locality != null ? res[0].locality+', ':null},${res[0].adminArea != null ? res[0].adminArea:null}`})
            if(pos.latitude != 0 && pos.longitude != 0){
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${res[0].locality}&appid=726db19d90971027a329515b851bfddc`)
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
                // setNewLocation({
                //     complete:res[0].formattedAddress,
                //     street:`${res[0].streetNumber} ${res[0].streetName}`,
                //     city:res[0].locality,
                //     state:res[0].adminArea,
                //     zip:res[0].postalCode, 
                // })
            }
        }).catch(err => console.log(err))
    }

    useEffect(()=>{
        setEmail(props.email)
        setTemp(props.temp)
        getWeather()
    },[props.email,props.temp,props.position])

    return(
        <View>
            <History email={props.email} current={{lat: currentCity.latitude, lng: currentCity.longitude}} speed={currentCity.speed}/>
            {email != '' ? <Checkbattery email={email}/> : null}
            {currentCity.city != '' ? <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                <View style={{left:0,width:'77%'}}>
                    <Text style={{fontSize:20,color:'#7F7FD5'}}>{props.name}</Text>
                    <Text style={{color:'#7F7FD5'}}>{currentCity.display}</Text>
                </View>
                <View style={{right:0,top:0,alignItems:'center'}}>
                    {wther.icon == '' ? date < 18 ? <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:35,width:35}} source={require('./weatherIcons/01d.png')}/>
                        <Text style={{color:'#7F7FD5'}}>{wther.temp}</Text>
                    </View> : <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image style={{height:35,width:35}} source={require('./weatherIcons/01d.png')}/>
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