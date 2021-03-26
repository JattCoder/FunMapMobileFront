import React,{ useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native'
import Fetchfamilies from './components/fetchfamilies'
import Home from '../Home/home'

export default Welcome = (props) => {

    const [user,setUser] = useState({})
    const [name,setName] = useState('')
    const [families,setFamilies] = useState(false)
    const [location,setLocation] = useState({latitude:0,longitude:0})

    updateFamIcon = () => {
        //animate the loading icon to check icon
        //check for locaiton..
    }

    updateValues = () => {
        fn = props.user.name.split(' ')[0].split('')[0]
        ln = props.user.name.split(' ')[props.user.name.split(' ').length - 1].split('')[0]
        nm = fn+ln
        setName(nm)
        setUser(props.user)
    }

    useSelector(state => {
        if(families != true && state.family.length > 0){
            setFamilies(true)
        }
    })

    useEffect(()=>{
        if(props.user.name) updateValues()
    },[props.user])

    if(families) updateFamIcon()

    return(
        <View style={Styles.frame}>
            <Fetchfamilies fams={user.families}/>
            <View style={Styles.innerFrame}>
                <Animated.View style={Styles.userImageFrame}>
                    <View style={Styles.userImageBackground}>
                        <Text style={Styles.name}>{name}</Text>
                    </View>
                </Animated.View>
                <Animated.View style={Styles.bodyFrame}>

                </Animated.View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    frame:{
        height:Dimensions.get('screen').height,
        width:Dimensions.get('screen').width,
        justifyContent:'center',
        alignItems:'center'
    },
    innerFrame:{
        width:'80%',
        height:'50%',
    },
    userImageFrame:{
        width:'100%',
        height:'30%',
        justifyContent:'center',
        alignItems:'center',
    },
    userImageBackground:{
        borderRadius:50,
        height:100,
        width:100,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        fontSize:25,
        color:'white'
    },
    bodyFrame:{
        width:'100%',
        height:'70%',
        backgroundColor:'yellow'
    }
})