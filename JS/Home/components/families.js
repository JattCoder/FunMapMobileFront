import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { family } from '../../../actions/families/family'
import { invitations } from '../../../actions/families/invitations'
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, Animated, StyleSheet } from 'react-native'
import { famselection } from '../../../actions/settings/famSelection'
import FamCard from './famCard'
import Invitations from './invitations'

export default Families = (props) => {

    const [fams,setFams] = useState([])
    const [invis,setInvis] = useState([])
    const [fam,setFam] = useState({Name:'',Users:[]})
    const [familyColor] = useState(new Animated.Value(0))
    const [rorateCard] = useState(new Animated.Value(0))
    const [inviColor] = useState(new Animated.Value(1))
    const [groupNumber,setGroupNumber] = useState(0)
    const [showInvi,setShowInvi] = useState(false)
    const dispatch = useDispatch()
    const selectedFam = useSelector((state) => {return state.settings.familySelection})

    useEffect(()=>{
        if(props.user.email) {
            dispatch(family(props.user.email))
            dispatch(invitations(props.user.email))
        }
        setFam(selectedFam)
    },[props.user.email])

    useSelector((state)=>{
        if(fams != state.family){
            setFams(state.family)
            if(state.family['nothing']) {
                setFam(state.family['First Group'])
                count = 0
                for(let selection in state.family){
                    if(selection == 'First Group'){
                        break
                    }
                    count += 1
                }
                 setGroupNumber(count)
            }else{
                setFam(state.family[Object.keys(state.family)[0]])
                setGroupNumber(0)
            //here set the first group as default because last saved group does not exists and update database with default group
            }
        }
        // if(invis != state.invitations){
        //     setInvis(state.invitations)
        // }
    })

    nextFamily = () => {
        if((groupNumber + 1) <= Object.keys(fams).length){
            setFam(fams[Object.keys(fams)[groupNumber+1]])
        }else setFam(fams[Object.keys(fams)[0]])
    }

    prevFamily = () => {
        if((groupNumber - 1) >= 0){
            setFam(fams[Object.keys(fams)[groupNumber-1]])
        }else setFam(fams[Object.keys(fams)[Object.keys(fams).length]])
    }

    showInvitations = () => {
        Animated.parallel([
            Animated.timing(familyColor,{
                toValue:1,
                duration:300,
                useNativeDriver:false
            }),
            Animated.timing(inviColor,{
                toValue:0,
                duration:300,
                useNativeDriver:false
            }),
            Animated.timing(rorateCard,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            })
        ]).start(()=>{
            setShowInvi(true)
        })
    }

    hideInvitations = () => {
        Animated.parallel([
            Animated.timing(familyColor,{
                toValue:0,
                duration:300,
                useNativeDriver:false
            }),
            Animated.timing(inviColor,{
                toValue:1,
                duration:300,
                useNativeDriver:false
            }),
            Animated.timing(rorateCard,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            })
        ]).start(()=>{
            setShowInvi(false)
        })
    }

    const familyColorInterpolate = familyColor.interpolate({
        inputRange:[0,1],
        outputRange:['#7F7FD5','rgba(142, 144, 145, 0.4)']
    })

    const inviColorInterpolate = inviColor.interpolate({
        inputRange:[0,1],
        outputRange:['#7F7FD5','rgba(142, 144, 145, 0.4)']
    })

    const rotateCardInterpolate = rorateCard.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','180deg']
    })

    return(
        <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:Dimensions.get('screen').width,height:'7%',alignItems:'center',position:'absolute',top:0,right:0}}>
                <View style={Styles.FamInvi}>
                    <Animated.View style={{width:'50%',height:'100%',backgroundColor:familyColorInterpolate,borderTopLeftRadius:10,zIndex:100}}>
                        <TouchableOpacity onPress={()=>hideInvitations()} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',borderTopLeftRadius:10}}>
                            <Text style={{color:'white'}}>Family</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{width:'50%',height:'100%',backgroundColor:inviColorInterpolate,borderTopRightRadius:10,zIndex:100}}>
                        <TouchableOpacity onPress={()=>showInvitations()} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',borderTopRightRadius:10}}>
                            {invis.length > 0 ? <View style={{borderRadius:50,backgroundColor:'#00BFFF',height:20,width:20,marginHorizontal:7,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#7F7FD5'}}>{invis.length}</Text>
                            </View> : null}
                            <Text style={{color:'white'}}>Invitations</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            <Animated.View style={{width:Dimensions.get('window').width,height:Dimensions.get('screen').height/2.3,opacity:1,transform: [{ rotateY: rotateCardInterpolate}]}}>
                <FamCard fam={fams} next={()=>nextFamily()} prev={()=>prevFamily()}/>
            </Animated.View>
        </View> 
    )
}

const Styles = StyleSheet.create({
    FamInvi:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
        borderWidth:0.5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        width:'40%',
        height:'100%',
        borderColor:'#7F7FD5'
    }
})