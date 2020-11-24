import React,{ useState } from 'react'
import { View, Text, Dimensions, ScrollView, Image, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ResultsIcon from '../../Components/resultsIcon/resultsIcon'
import LinearGradient from 'react-native-linear-gradient'
import { ceil } from 'react-native-reanimated'

export default PlaceSearcgResults = () => {

    const [placeInfo,setPlaceInfo] = useState({
        name:''
    })
    const dispatch = useDispatch() 

    useSelector((state)=>{
        if(state.marker != placeInfo){
            setPlaceInfo(state.marker)
        }
    })

    return( placeInfo.name != '' ? <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/1.5,alignItems:'center'}}>
        <View style={Styles.Icon}><Image style={{height:'50%',width:'50%',padding:'10%'}} source={{uri:placeInfo.icon}}/></View>
        <Text style={{fontWeight:'bold',color:'white',fontSize:20,margin:'5%'}}>{placeInfo.name}</Text>
        <Text>{placeInfo.formatted_address}</Text>
    </View> : null )
}

const Styles = StyleSheet.create({
    Icon:{
        width:Dimensions.get('screen').width/7.2,
        height:Dimensions.get('screen').height/17.2,
        borderRadius:50,borderLeftColor:'white',
        borderTopColor:'rgba( 0, 0, 0, 0.0)',
        borderBottomColor:'white',
        borderRightColor:'white',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderLeftWidth:2,
        borderRightWidth:2
    },
    Outer:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:'1%',
        marginHorizontal:'1%',
    },
    Item:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:15,
        borderWidth:0.5,
        borderStartColor:'white',
        marginVertical:'1%',
        shadowColor:'white',
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 50,
    }
})