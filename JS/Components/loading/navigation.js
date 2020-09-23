import React,{ useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default Navigation = (props) => {

    const [status,setstatus] = useState('Finding Route')
    const [countdown,setcountdown] = useState(6)
    let num = 0
    let interval;

    useEffect(()=>{
        timeOut()
    })

    timeOut = () => {
        setTimeout(()=>{
            setstatus('Failed to Find Route')
            interval = setInterval(()=>{
                num = num + 1
                setcountdown(countdown - num)
                if(num == 6) {
                    clearInterval(interval)
                }
            },1000)
        },20000)
    }

    useSelector((state)=>{
        let navigation = state.navigation
        if(navigation.status != '' && navigation.destination.length > 0){
            clearInterval(interval)
            //clear searches, marker
        }
    })

    return(
        <View style={Styles.Loading}>
            <Text style={Styles.First}>{status}</Text>
            <Text style={Styles.Third}>{props.name}</Text>
            {countdown == 6 ? <ActivityIndicator size='small' color='white' />
            : <Text style={Styles.CountDown}>{countdown}</Text>}
        </View>
    )
}

const Styles = StyleSheet.create({
    Loading:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        width:'95%',
        height:'95%',
        borderRadius:25
    },
    First:{
        color:'white',
        fontSize:20,
        marginBottom:5
    },
    Third:{
        color:'white',
        fontSize:20,
        marginBottom:5
    },
    CountDown:{
        color:'white',
        fontSize:25
    }
})