import React,{ useState, useEffect } from 'react'
import { family } from '../../../actions/families/family'
import { newfam } from '../../../actions/families/newfam'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'
import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native'

export default NewFamily = (props) => {

    const [name,setName] = useState('')
    const dispatch = useDispatch()

    create = () => {
        dispatch(newfam(props.user.id,props.user.email,name,props.user.families))
        //props.finish()
    }
    console.warn(props.user)
    useSelector((state)=>{
        if(Object.keys(state.family) > 0){
            for(let i in state.family){
                if(name == i){
                    setName('')
                    props.finish()
                }
            }
        }
    })

    return(
        <View style={{width:Dimensions.get('screen').width,height:'100%',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'black',fontSize:25,marginBottom:'20%'}}>New Family</Text>
            <View style={{width:Dimensions.get('screen').width/1.2,height:55,borderRadius:10,alignItems:'center',flexDirection:'row',marginVertical:'5%'}}>
                <View activeOpacity={1} onPress={()=>openSearch()} style={{backgroundColor:'rgba(0,0,0,0.9)',borderRadius:10,height:'100%',width:'18%',justifyContent:'center',alignItems:'center',zIndex:20}}>
                    <Text style={{color:'white'}}>Name</Text>
                </View>
                <View style={{opacity:1,height:'100%',width:'80%',backgroundColor:'rgba(0,0,0,0.5)',borderRadius:10,marginLeft:-15,justifyContent:'center',paddingLeft:25,paddingRight:10}}>
                    <TextInput style={{fontSize:20,color:'white'}} value={name} onChangeText={(e)=>setName(e)}/>
                </View>
            </View>
            <TouchableOpacity onPress={()=>create()} style={{width:Dimensions.get('screen').width/2.4,height:'8%',borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'#7F7FD5'}}>
                  <Text style={{color:'white'}}>Create</Text>
            </TouchableOpacity>
        </View> 
    )
}