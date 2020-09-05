import React from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'

export default Placeinfo = (props) => {
    let star = props.place.rating
    return(
        <View style={Styles.BottomTab}>
                <View style={{marginTop:'10%',marginLeft:'5%',flexDirection:'row'}}>
                    <Text style={{fontSize:20}}>{props.place.name}</Text>
                    {star < 1 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/zero_star.png')}/>
                    : star < 2 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/one_star.png')}/>
                    : star < 3 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/two_star.png')}/>
                    : star < 4 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/three_star.png')}/>
                    : star < 5 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/four_star.png')}/>
                    : star == 5 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/five_star.png')}/>
                    : null}
                </View>
                <View>

                </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    BottomTab:{
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        borderTopRightRadius:85,
    }
})