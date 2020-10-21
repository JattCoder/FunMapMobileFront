import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { family } from '../../../actions/families/family'
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import FamCard from './famCard'

export default Families = (props) => {

    const [fams,setFams] = useState([])
    const [fam,setFam] = useState(0)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(props.user.id) dispatch(family(props.user.id))
    },[props.user.id])

    useSelector((state)=>{
        if(fams != state.family){
            setFams(state.family)
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

    return(
        <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:Dimensions.get('screen').width,height:'7%',justifyContent:'center',alignItems:'center'}}>
                <View style={{position:'absolute',right:20,flexDirection:'row',bottom:5,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity><Text style={{color:'white'}}>Invitations</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{width:Dimensions.get('window').width,height:'90%'}}>
                {fams.length != 0 ? <FamCard fam={fams[fam]} next={()=>nextFamily()} prev={()=>prevFamily()}/>
                : <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator color={'white'} size={'large'}/>
                </View> }
            </View>
        </View> 
    )
}