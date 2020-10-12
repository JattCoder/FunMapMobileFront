import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default Navigation = () => {

    const [actionType,setActionType] = useState('')

    const colors = {
        select: '#3498DB',
        unselect: 'white'
    }
    //Miles - Kilometer
    const [milesColor,setMilesColor] = useState(colors.select)
    const [milesTextColor,setMilesTextColor] = useState(colors.unselect)
    const [kilometerColor,setKilometerColor] = useState(colors.unselect)
    const [kilometerTextColor,setKilometerTextColor] = useState(colors.select)
    const [uSelection,setUSelection] = useState('')

    //Temperature
    const [fColor,setFColor] = useState(colors.select)
    const [fTextColor,setFTextColor] = useState(colors.unselect)
    const [cColor,setCColor] = useState(colors.unselect)
    const [cTextColor,setCTextColor] = useState(colors.select)
    const [kColor,setKColor] = useState(colors.unselect)
    const [kTextColor,setKTextColor] = useState(colors.select)
    const [tSelection,setTSelection] = useState('')

    //optimize to reorder the waypoints to decrese the time
    //&waypoints=optimize:true|San Francisco|Miami,FL
    //&waypoints=via:-37.81223%2C144.96254%7Cvia:-34.92788%2C138.60008
    //avoid=tolls|highways|ferries
    //units=metric (Kilometer) or imperial (miles)
    //Navigation
    const drivingModes = {
        Bycycling: 'bicycling',
        Driving: 'driving',
        Transit: 'transit',
        Walking: 'walking'
    }
    const avoid = {
        Highways: 'highways',
        Tolls: 'tolls',
        Ferries: 'ferries'
    }


    return(
        <View>
            <Text>Hello</Text>
        </View>
    )
}


const Style = StyleSheet.create({
    title:{
        fontSize:20,
        marginTop:20
    },
    units:{
        width:100,
        height:50,
        borderRadius:10,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'3%'
    },
    unitsWeather:{
        width:90,
        height:50,
        borderRadius:10,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'3%'
    }
})