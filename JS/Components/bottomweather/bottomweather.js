import React,{ useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Checkbattery from './checkbattery'
import { View, Text, Image } from 'react-native'
import Weathericon from './weathericon'
import History from '../../Home/components/history'
import Geocoder from 'react-native-geocoder-reborn'

export default Bottomweather = (props) => {

    const[wther,setweather] = useState({ temp:0, icon:''})
    //const[position,setPosition] = useState({latitude:0,longitude:0})
    const[currentCity,setCurrentCity] = useState({city:'',display:'',date:''})
    const[temp,setTemp] = useState('F°')
    const[email,setEmail] = useState('')

    updateWeather = (lastCity) => {
        if((lastCity != currentCity.city && lastCity != '') || (new Date().getHours() >= new Date(currentCity.date).getHours() + 6) || currentCity.date == '' || (wther.temp == 0)){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity.city}&appid=726db19d90971027a329515b851bfddc`)
            .then(res => {return res.json()})
            .then(data => {
                if(Object.keys(data).length != 2){
                    setCurrentCity({city:currentCity.city,display:currentCity.display,date:new Date()})
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
                }else{
                    setweather({
                        temp: 'N/A',
                        icon: ''
                    })
                }
            })
            .catch(err => console.warn('Weather Error: ',err.message))
        }
    }

    geocode = (position) => {
        lastCity = currentCity.city != '' ? currentCity.city : ''
        Geocoder.geocodePosition(position).then(res => {
            if(lastCity == '') lastCity = res[0].locality
            setCurrentCity({city:res[0].locality?res[0].locality:res[0].feature,display:res[0].streetName || res[0].locality || res[0].adminArea ? `${res[0].streetName != null ? res[0].streetName+', ':null}${res[0].locality != null ? res[0].locality+', ':null}${res[0].adminArea != null?res[0].adminArea:null}`:res[0].feature,date:currentCity.date})
            updateWeather(lastCity == '' ? res[0].locality : lastCity)
        }).catch(err => {
            //SECOND SOURCE
            fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${position.lat},${position.lng}&lang=en-US&apiKey=tOzyGAv3qnNge0QzSmXnwD54zKsR4xCZY3M5yMC22OM`)
            .then(res => {return res.json()})
            .then(info => {
                if(lastCity == '') lastCity = info.items[0].address.city
                // if(info.items){
                //     setCurrentCity({city:info.items[0].address.city,display:`${info.items[0].address.street != null ? info.items[0].address.street+', ':''}${info.items[0].address.city != null ? info.items[0].address.city+', ':''}${info.items[0].address.stateCode != null ? info.items[0].address.stateCode:''}`,date:currentCity.date})
                // }
                updateWeather(lastCity)
            })
            .catch(err => {
                console.warn('Error from second source: ',err)
            })
        })
    }

    // useSelector(state => {
    //     if(position.latitude != state.mylocation.latitude || position.longitude != state.mylocation.longitude){
    //         setPosition({latitude:state.mylocation.latitude,longitude:state.mylocation.longitude})
    //         geocode()
    //     }
    // })

    useEffect(()=>{
        setEmail(props.email)
        setTemp(props.temp)
        geocode({lat:props.position.latitude,lng:props.position.longitude})
    },[props.email,props.temp,props.position])

    return(
        <View>
            <History email={props.email} current={{lat: currentCity.latitude, lng: currentCity.longitude}} speed={currentCity.speed}/>
            {email != '' ? <Checkbattery email={email}/> : null}
            {currentCity.city != '' ? <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                <View style={{left:0,width:'77%'}}>
                    <Text style={{fontSize:20,color:'#7F7FD5'}}>{props.name}</Text>
                    <Text style={{color:'#7F7FD5'}}>{currentCity.display.replace('null,','').replaceAll('null','')}</Text>
                </View>
                <View style={{right:0,top:0,alignItems:'center'}}>
                    {wther.icon == '' ? currentCity.date < 18 ? <View style={{justifyContent:'center',alignItems:'center'}}>
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