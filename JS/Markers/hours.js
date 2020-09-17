import React from 'react'
import { View, Text } from 'react-native'

export default Hours = (props) => {
    let [day,time,hour] = new Date().toLocaleTimeString('en-us', {weekday:'long'}).split(' ')
    return(
        <View>
            {props.day.includes(day) ? <Text style={{color:'white',fontSize:17}}>{props.day}</Text>
            : <Text style={{color:'#C0C0C0',fontSize:14,marginLeft:5}}>{props.day}</Text>}
        </View>
    )
}