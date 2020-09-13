import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clemarker } from '../../actions/marker/clemarker'
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native'

export default Details = () => {

    const dispatch = useDispatch()
    const [details,setdetails] = useState({
        name: '',
        rating: '',
        placeid: '',
        lat: 0.00,
        lng: 0.00,
        formatted_address: '',
        formatted_phone_number: '',
        opening_hours: [],
        open_now: '',
        reviews: '',
        types: ''
    })

    useSelector((state)=>{
        if(state.marker.name != details.name) setdetails(state.marker)
    })

    return(
        details.name != '' ? <View style={Styles.Card}>
        {details.name != '' ? <View style={Styles.Details}>
            <Text style={Styles.PlaceName}>{details.name}</Text>
            <Text style={Styles.PlaceAddress}>{details.formatted_address}</Text>
            <Text style={Styles.PlaceHours}>{details.opening_hours}</Text>
            <View style={Styles.Buttons}>
                <TouchableOpacity style={Styles.Navigate}>
                    <Text style={{color:'white',fontSize:17}}>Navigate</Text>
                    <Image style={Styles.Arrow} source={require('../Arrow/arrow_marker.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Linking.openURL(`tel:${details.formatted_phone_number}`)} style={Styles.Call}>
                    <Text style={{color:'white',fontSize:17}}>Call</Text>
                    <Image style={Styles.Phone} source={require('../Phone/phone.png')}/>
                </TouchableOpacity>
            </View>
        </View> : <View style={Styles.NoDetails}>
            <Text style={Styles.NoDetailsMessage}>Failed!</Text>
        </View>}
        <TouchableOpacity onPress={()=>dispatch(clemarker())} style={Styles.CloseButton}>
            <Image style={Styles.CloseImage} source={require('./close.png')} />
        </TouchableOpacity>
    </View> : null
    )
}

const Styles = StyleSheet.create({
    Card:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%'
    },
    Details:{
        height:'95%',
        width:'95%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius:25,
        padding:25
    },
    NoDetails:{
        height:'95%',
        width:'95%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    },
    NoDetailsMessage:{
        fontSize:30,
        color:'white'
    },
    CloseButton:{
        position:'absolute',
        top:0,
        right:0,
        width:40,
        height:40,
        backgroundColor:'white',
        margin:20,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    },
    CloseImage:{
        height:'98%',
        width:'98%'
    },
    PlaceName:{
        fontSize:25,
        color:'white'
    },
    PlaceAddress:{
        fontSize:14,
        color:'white',
        marginTop:10,
        marginLeft:5,
        width:'80%'
    },
    PlaceHours:{
        fontSize:14,
        color:'white',
        marginTop:7,
        marginLeft:5
    },
    Buttons:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        position:'absolute',
        bottom:0,
        height:'25%',
    },
    Navigate:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 25,
        borderWidth:0.5,
        width:'40%',
        height:'65%',
        marginLeft:20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    Arrow:{
        marginLeft:10,
        width:'20%',
        height:'60%'
    },
    Call:{
        flexDirection:'row',
        height:'65%',
        width:'40%',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:0.5,
        marginLeft:20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    Phone:{
        marginLeft:10,
        width:'20%',
        height:'60%'
    }
})