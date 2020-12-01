import React,{ useState, useEffect } from 'react'
import { locshare } from '../../../actions/settings/locShare'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

export default Locationshare = () => {

    const [publiColor,setPubliColor] = useState('rgba(142, 144, 145, 0.4)')
    const [familyColor,setFamilyColor] = useState('rgba(142, 144, 145, 0.4)')
    const [ghostColor,setGhoftColor] = useState('#00BFFF')
    const [fams,setFams] = useState([])
    const [id,setID] = useState(-1)
    const [settings,setSettings] = useState({})
    const [selection,setSelection] = useState('Ghost')
    const dispatch = useDispatch()
    const permit = useSelector((state)=>{return state.settings.permitted})

    useEffect(()=>{
        selecType(permit)
    },[])

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

    updateChange = (selection) => {
        selecType(selection)
        dispatch(locshare(id,selection))
        fams.map((group)=>{
            firebase.database().ref('FamilyGroups/'+group[0].id+'/'+id).update({
                permitted: selection,
            });
        })
    }

    useSelector((state)=>{
        if(fams != state.family){
            setFams(state.family)
        }
        if(id != state.login.message.id){
            setID(state.login.message.id)
        }
    })

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