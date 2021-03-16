import React,{ useState, useEffect } from 'react'
import firebase from 'firebase'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export default Locationshare = (props) => {

    const [publiColor,setPubliColor] = useState('rgba(142, 144, 145, 0.4)')
    const [familyColor,setFamilyColor] = useState('rgba(142, 144, 145, 0.4)')
    const [ghostColor,setGhoftColor] = useState('#7F7FD5')

    useEffect(()=>{
        console.warn('Email: ',props.share)
        //updateChange(props.share)
    },[props.email,props.share])

    selecType = (selection) => {
        if(selection == 'Public'){
            setPubliColor('#7F7FD5')
            setFamilyColor('rgba(142, 144, 145, 0.4)')
            setGhoftColor('rgba(142, 144, 145, 0.4)')
        }else if(selection == 'Family'){
            setPubliColor('rgba(142, 144, 145, 0.4)')
            setFamilyColor('#7F7FD5')
            setGhoftColor('rgba(142, 144, 145, 0.4)')
        }else if(selection == 'Ghost'){
            setPubliColor('rgba(142, 144, 145, 0.4)')
            setFamilyColor('rgba(142, 144, 145, 0.4)')
            setGhoftColor('#7F7FD5')
        }
    }

    updateProfile = (selection) => {
        firebase.database().ref('Users/'+props.email.replace(punctuation,'').replace(spaceRE,'')+'/').update({
            locationShare: selection == 'Public' ? true : false
        })
    }

    updateChange = (selection = '') => {
        if(selection == ''){
            selecType('Ghost')
            updateProfile('Ghost')
        }else{
            selecType(selection)
            updateProfile(selection)
        }
    }

    return(
        <View style={{width:Dimensions.get('window').width,height:'5%',justifyContent:'center', alignItems:'center',borderRadius:10}}>
            <View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row',borderColor:'#7F7FD5',borderWidth:1,borderRadius:10}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>updateChange('Public')} style={[Style.Buttons,{borderRightColor:'#7F7FD5',borderTopLeftRadius:9,borderBottomLeftRadius:9,borderRightWidth:0.5,backgroundColor:publiColor}]}>
                    <Text style={Style.ButtonText}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={()=>updateChange('Family')} style={[Style.Buttons,{backgroundColor:familyColor}]}>
                    <Text style={Style.ButtonText}>Family</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={()=>updateChange('Ghost')} style={[Style.Buttons,{borderLeftColor:'#7F7FD5',borderTopRightRadius:9,borderBottomRightRadius:9,borderLeftWidth:0.5,backgroundColor:ghostColor}]}>
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