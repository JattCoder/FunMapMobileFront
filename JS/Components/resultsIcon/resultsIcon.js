import React,{ useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default ResultsIcon = (props) => {

    const [distance,setDistance] = useState('')

    getDistance = () => {
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${props.geo.lat},${props.geo.lng}&destinations=${props.mygeo.lat},${props.mygeo.lng}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => {return res.json()})
        .then(data => {
            setDistance(data.rows[0].elements[0].distance.text)
            //setDistance(data.rows.elements.distance.text)
        })
        .catch(err => console.log(err.message))
    }

    return(
        <View style={{justifyContent:'center',alignItems:'center'}}>
            {props.rating ? <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                    {props.rating < 1 ? <Image source={require('../../Stars/halfstar.png')}/> 
                    : props.rating < 2 ? props.rating == 1 ? <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/></View>
                                         : <View style={Styles.Layout}><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/halfstar.png')}/></View>
                    : props.rating < 3 ? props.rating == 2 ? <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/></View>
                                         : <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/halfstar.png')}/></View>
                    : props.rating < 4 ? props.rating == 3 ? <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/></View>
                                         : <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/halfstar.png')}/></View>
                    : props.rating < 5 ? props.rating == 4 ? <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:0,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:0,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/></View>
                                         : <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:7,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:-4,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:7,transform:[{ rotate: '100deg' }]}]} source={require('../../Stars/halfstar.png')}/></View>
                    : props.rating < 6 ? props.rating == 5 ? <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:10,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:2,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:-5,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:7,transform:[{ rotate: '100deg' }]}]} source={require('../../Stars/fullstar.png')}/></View>
                                         : <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:10,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={[Styles.Star,{marginTop:10,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/halfstar.png')}/></View>
                    : props.rating < 7 ? props.rating == 6 ? <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:10,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/></View>
                                         : <View style={Styles.Layout}><Image style={[Styles.Star,{marginTop:10,transform:[{ rotate: '180deg' }]}]} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/fullstar.png')}/><Image style={Styles.Star} source={require('../../Stars/halfstar.png')}/></View>
                    : null}
                </View>
                <Image style={{height:20,width:20,marginHorizontal:'1.5%'}} source={{uri: props.icon}} />
            </View> 
            : <View style={{justifyContent:'center',alignItems:'center'}}><Image style={{height:20,width:20,marginHorizontal:'1.5%'}} source={{uri: props.icon}} /></View>}
            <Text style={{fontSize:9,marginTop:'5%',color:'white'}}>{distance == '' ? getDistance() : distance}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    Layout:{
        flexDirection:'row'
    },
    Star:{
        height:10,
        width:10
    }
})