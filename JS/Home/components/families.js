import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { family } from '../../../actions/families/family'
import { View, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native'
import FamCard from './famCard'

export default Families = (props) => {

    const [fams,setFams] = useState([])
    const [received,setReceived] = useState(false)
    const dispatch = useDispatch()

    getFamilies = () => {
        var url = new URL("http://localhost:3000/account/families"),
            params = {id:props.user.id}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(res => {return res.json()})
        .then(groups => {
            if(groups.result == false)
                console.warn(groups.message)
            else if(groups.result == true) dispatch(family(groups.message))
            setReceived(true)
        })
        .catch(err => console.warn(err.message))
    }

    useEffect(()=>{
        if(props.user.id && received == false) getFamilies()
    })

    useSelector((state)=>{
        if(fams != state.family){
            console.log('Families... ',state.family)
            setFams(state.family)
        }
    })

    return(
        <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:Dimensions.get('screen').width,height:'7%',justifyContent:'center',alignItems:'center'}}>
                <View style={{position:'absolute',right:20,flexDirection:'row',bottom:5,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity><Text style={{color:'white'}}>Invitations</Text></TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal={true} 
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{width:Dimensions.get('window').width,height:'100%'}}>
                    {fams.map((fam,index)=>{
                        return <FamCard fam={fam} index={index}/>
                    })}
            </ScrollView>
        </View> 
    )
}