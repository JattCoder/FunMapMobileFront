import React,{ useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

export default Locationshare = () => {

    const [publiColor,setPubliColor] = useState('rgba(142, 144, 145, 0.4)')
    const [familyColor,setFamilyColor] = useState('rgba(142, 144, 145, 0.4)')
    const [ghostColor,setGhoftColor] = useState('#00BFFF')

    selecType = (selection) => {
        if(selection == 'Public'){
            setPubliColor('#00BFFF')
            setFamilyColor('rgba(142, 144, 145, 0.4)')
            setGhoftColor('rgba(142, 144, 145, 0.4)')
        }else if(selection == 'Family'){
            setPubliColor('rgba(142, 144, 145, 0.4)')
            setFamilyColor('#00BFFF')
            setGhoftColor('rgba(142, 144, 145, 0.4)')
        }else if(selection == 'Ghost'){
            setPubliColor('rgba(142, 144, 145, 0.4)')
            setFamilyColor('rgba(142, 144, 145, 0.4)')
            setGhoftColor('#00BFFF')
        }
    }

    return(
        <View style={{width:Dimensions.get('window').width,height:'5%',justifyContent:'center', alignItems:'center',}}>
            <View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row',borderColor:'white',borderWidth:1}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>selecType('Public')} style={[Style.Buttons,{borderRightColor:'white',borderRightWidth:0.5,backgroundColor:publiColor}]}>
                    <Text style={Style.ButtonText}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={()=>selecType('Family')} style={[Style.Buttons,{backgroundColor:familyColor}]}>
                    <Text style={Style.ButtonText}>Family</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={()=>selecType('Ghost')} style={[Style.Buttons,{borderLeftColor:'white',borderLeftWidth:0.5,backgroundColor:ghostColor}]}>
                    <Text style={Style.ButtonText}>Ghost</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    Buttons:{
        width:'33.33%',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    ButtonText:{
        color:'white'
    }
})