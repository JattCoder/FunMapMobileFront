import React from 'react'
import { Image } from 'react-native'

export default Weathericon = (props) => {
    switch (props.icon){
        case '01d':
            return <Image style={{height:35,width:35}} source={require('../../weather/01d.png')}/>
        case '01n':
            return <Image style={{height:35,width:35}} source={require('../../weather/01n.png')}/>
        case '02d':
            return <Image style={{height:35,width:35}} source={require('../../weather/02d.png')}/>
        case '02n':
            return <Image style={{height:35,width:35}} source={require('../../weather/03n.png')}/>
        case '03d':
            return <Image style={{height:35,width:35}} source={require('../../weather/03d.png')}/>
        case '03n':
            return <Image style={{height:35,width:35}} source={require('../../weather/03n.png')}/>
        case '04d':
            return <Image style={{height:35,width:35}} source={require('../../weather/04d.png')}/>
        case '04n':
            return <Image style={{height:35,width:35}} source={require('../../weather/04n.png')}/>
        case '10d':
            return <Image style={{height:35,width:35}} source={require('../../weather/10d.png')}/>
        case '10n':
            return <Image style={{height:35,width:35}} source={require('../../weather/10n.png')}/>
        case '11d':
            return <Image style={{height:35,width:35}} source={require('../../weather/11d.png')}/>
        case '11n':
            return <Image style={{height:35,width:35}} source={require('../../weather/11n.png')}/>
        case '13d':
            return <Image style={{height:35,width:35}} source={require('../../weather/13d.png')}/>
        case '13n':
            return <Image style={{height:35,width:35}} source={require('../../weather/13n.png')}/>
        default:
            return <Image style={{height:35,width:35}} source={{uri: `http://openweathermap.org/img/wn/${props.icon}@2x.png`}}/>
    }
}