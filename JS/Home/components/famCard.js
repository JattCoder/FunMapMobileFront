import React from 'react'
import UserCard from './userCard'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'

export default FamCard = (props) => {

    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center'}}>
            <View style={{width:Dimensions.get('screen').width/1.07,height:'97%',shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(0,0,0,0.4)',borderRadius:10,alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View style={{marginTop:'3%',marginHorizontal:'4%'}}><TouchableOpacity onPress={()=>{props.prev()}} style={{backgroundColor:'#9932cc',borderRadius:5,width:'170%',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:20,color:'white'}}>{'<'}</Text></TouchableOpacity></View>
                    <View style={{marginTop:'3%',borderRadius:10,backgroundColor:'#9932cc',justifyContent:'center',alignItems:'center'}}><Text style={{margin:'2%',fontSize:20,justifyContent:'center',color:'white'}}>{props.fam[0].name}</Text></View>
                    <View style={{marginTop:'3%',marginHorizontal:'2%'}}><TouchableOpacity onPress={()=>{props.next()}} style={{backgroundColor:'#9932cc',borderRadius:5,width:'170%',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:20,color:'white'}}>{'>'}</Text></TouchableOpacity></View>
                </View>
                <View style={{width:'100%',height:'5%',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>alert('New Fam Member')} style={{zIndex:500,flexDirection:'row',alignItems:'center',position:'absolute',left:15,top:0}}>
                        <Image style={{width:35,height:35}} source={require('../../settingsIcons/plus.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('Settings')} style={{flexDirection:'row',alignItems:'center',position:'absolute',right:15,top:0}}>
                        <Image style={{width:35,height:35}} source={require('../../settingsIcons/setting.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{height:'75%',width:'100%',margin:20}}>
                    <ScrollView>
                        {props.fam[1].map((user,index)=>{
                            return <UserCard user={user} famid={props.fam[0].id} key={index}/>
                        })}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}