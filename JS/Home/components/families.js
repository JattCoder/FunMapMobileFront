import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { family } from '../../../actions/families/family'
import { invitations } from '../../../actions/families/invitations'
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, Animated, StyleSheet } from 'react-native'
import { famselection } from '../../../actions/settings/famSelection'
import FamCard from './famCard'
import InviCard from './inviCard'
import NoFamInvi from './noFamInvi'

export default Families = (props) => {

    const [fams,setFams] = useState([])
    const [invis,setInvis] = useState([])
    const [fam,setFam] = useState({Name:'',Users:[]})
    const [familyColor] = useState(new Animated.Value(0))
    const [rorateCard] = useState(new Animated.Value(0))
    const [inviColor] = useState(new Animated.Value(1))
    const [groupNumber,setGroupNumber] = useState(0)
    const [familyCardOpacity] = useState(new Animated.Value(1))
    const [invitationCardOpacity] = useState(new Animated.Value(0))
    const [rotateInvitations] = useState(new Animated.Value(1))
    const [familyPopUp] = useState(new Animated.Value(1))
    const [InviPopUp] = useState(new Animated.Value(-1))
    const [showInvi,setShowInvi] = useState(false)
    const dispatch = useDispatch()

    currentFamily = (email = '') => {
        dispatch(famselection(email,fam.Name))
    }

    useEffect(()=>{
        if(props.user.families) {
            dispatch(family(props.user.families))
        }
    },[props.user.families])

    useSelector((state)=>{
        if(fams != state.family){
            props.user.famSelection != '' ?
            state.family.map(family => {
                    if(family.id == props.user.famSelection) console.warn('true')
                })
            : setFam(state.family[0])
            setFams(state.family)
        }
        //console.warn(props.user.famSelection)
        // if(invis != state.invitations){
        //     setInvis(state.invitations)
        // }
    })

    nextFamily = () => {
        if((groupNumber + 1) < Object.keys(fams).length){
            setFam(fams[Object.keys(fams)[groupNumber+1]])
            dispatch(famselection(props.user.id,fams[Object.keys(fams)[groupNumber+1]].name))
            setGroupNumber(groupNumber+1)
        }else {
            setFam(fams[Object.keys(fams)[0]])
            dispatch(famselection(props.user.id,fams[Object.keys(fams)[0]].Name))
            setGroupNumber(0)
        }
    }

    prevFamily = () => {
        if((groupNumber - 1) >= 0){
            setFam(fams[Object.keys(fams)[groupNumber-1]])
            dispatch(famselection(props.user.id,fams[Object.keys(fams)[groupNumber-1]].name))
            setGroupNumber(groupNumber - 1)
        }else {
            setFam(fams[Object.keys(fams)[Object.keys(fams).length - 1]])
            dispatch(famselection(props.user.id,fams[Object.keys(fams)[Object.keys(fams).length - 1]].Name))
            setGroupNumber(Object.keys(fams).length - 1)
        }
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
            }),
            Animated.timing(familyCardOpacity,{
                toValue:0,
                duration:10,
                useNativeDriver:false
            }),
            Animated.timing(familyPopUp,{
                toValue:-1,
                duration:10,
                useNativeDriver:false
            }),
            Animated.timing(rotateInvitations,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(invitationCardOpacity,{
                toValue:1,
                duration:1000,
                useNativeDriver:false
            }),
            Animated.timing(InviPopUp,{
                toValue:1,
                duration:10,
                useNativeDriver:false
            })
        ]).start(()=>{
            Animated.parallel([
                
            ]).start(()=>setShowInvi(true))
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
            }),
            Animated.timing(familyCardOpacity,{
                toValue:1,
                duration:1000,
                useNativeDriver:false
            }),
            Animated.timing(familyPopUp,{
                toValue:1,
                duration:10,
                useNativeDriver:false
            }),
            Animated.timing(rotateInvitations,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(invitationCardOpacity,{
                toValue:0,
                duration:10,
                useNativeDriver:false
            }),
            Animated.timing(InviPopUp,{
                toValue:-1,
                duration:10,
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

    const rotateInvitaionsInterpolate = rotateInvitations.interpolate({
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
            <Animated.View style={{position:'absolute',width:Dimensions.get('window').width,height:Dimensions.get('screen').height/2.3,opacity:familyCardOpacity,zIndex:familyPopUp,transform: [{ rotateY: rotateCardInterpolate}]}}>
                {Object.keys(fams).length > 0 ? <FamCard UserName={props.user.name} UserEmail={props.user.email} ID={fam.id} Name={fam.name} Message={fam.message} Users={fam.members} gettogether={fam.GetTogether} locShare={props.user.locationShare} next={()=>nextFamily()} prev={()=>prevFamily()} size={Object.keys(fams).length}/>
                : <NoFamInvi message={'Family'}/>}
            </Animated.View>
            <Animated.View style={{position:'absolute',width:Dimensions.get('window').width,height:Dimensions.get('screen').height/2.3,opacity:invitationCardOpacity,zIndex:InviPopUp,transform: [{ rotateY: rotateInvitaionsInterpolate}]}}>
                {Object.keys(invis).length > 0 ? <InviCard /> : <NoFamInvi message={'Invitations'}/>}
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