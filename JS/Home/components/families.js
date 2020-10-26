import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { family } from '../../../actions/families/family'
import { invitations } from '../../../actions/families/invitations'
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'
import firebase from 'firebase'
import FamCard from './famCard'
import Invitations from './invitations'

export default Families = (props) => {

    const [fams,setFams] = useState([])
    const [invis,setInvis] = useState([])
    const [fam,setFam] = useState(0)
    const [invitationHeight] = useState(new Animated.Value(0))
    const [invitationOpacity] = useState(new Animated.Value(0))
    const [familyHeight] = useState(new Animated.Value(Dimensions.get('screen').height/1.9))
    const [familyOpacity] = useState(new Animated.Value(1))
    const dispatch = useDispatch()

    useEffect(()=>{
        if(props.user.id) {
            dispatch(family(props.user.id))
            dispatch(invitations(props.user.id))
        }
    },[props.user.id])

    useSelector((state)=>{
        if(fams != state.family){
            setFams(state.family)
            setInvis(state.invitations)
        }
        if(invis != state.invitations){
            setInvis(state.invitations)
        }
    })

    nextFamily = () => {
        if(fam + 1 >= fams.length){
            setFam(0)
        }else{
            setFam(fam+1)
        }
    }

    prevFamily = () => {
        if(fam - 1 < 0){
            setFam(fams.length - 1)
        }else{
            setFam(fam-1)
        }
    }

    showInvitations = () => {
        Animated.parallel([
            Animated.timing(invitationHeight,{
                toValue: Dimensions.get('screen').height/2.1,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(invitationOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(familyHeight,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(familyOpacity,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            })
        ]).start()
    }

    return(
        <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:Dimensions.get('screen').width,height:'7%',justifyContent:'center',alignItems:'center',position:'absolute',top:0,right:0}}>
                <View style={{position:'absolute',right:20,flexDirection:'row',bottom:5,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>showInvitations()} style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    {invis.length > 0 ? <View style={{borderRadius:50,backgroundColor:'#00BFFF',height:20,width:20,marginHorizontal:7,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>{invis.length}</Text>
                    </View> : null}
                    <Text style={{color:'white'}}>Invitations</Text>
                </TouchableOpacity>
                </View>
            </View>
            <Animated.View style={{opacity:invitationOpacity,height:invitationHeight,width:Dimensions.get('screen').width}}>
                <Invitations invitations={invis}/>
            </Animated.View>
            <Animated.View style={{width:Dimensions.get('window').width,height:familyHeight,opacity:familyOpacity}}>
                {fams.length != 0 ? <FamCard fam={fams[fam]} next={()=>nextFamily()} prev={()=>prevFamily()}/>
                : <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator color={'white'} size={'large'}/>
                </View> }
            </Animated.View>
        </View> 
    )
}