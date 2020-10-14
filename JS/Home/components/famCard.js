import React,{ useState, useEffect } from 'react'
import firebase from 'firebase'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

export default FamCard = (props) => {

    const [sortedList,setSortedList] = useState([])
    let idlist = []

    getData = () => {
        //Send the list of users to backend and get hashmap of users data
        //connect firebase realtime database in FamCard to update user current location
        console.warn(idlist)
    }

    useEffect(()=>{
        if(props.fam.admins != '')
        props.fam.admins.split(' ').map((userid)=>{
            idlist.push(parseInt(userid))
        })
        if(props.fam.users != '')
            props.fam.users.split(' ').map((userid)=>{
                idlist.push(parseInt(userid))
            })
        getData()
    })

    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center'}}>
            <View style={{width:Dimensions.get('screen').width/1.07,height:'97%',shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(0,0,0,0.4)',borderRadius:10,alignItems:'center'}}>
                <View style={{marginTop:'3%',borderRadius:10,backgroundColor:'#9932cc'}}><Text style={{margin:'2%',fontSize:20,justifyContent:'center',color:'white'}}>{props.fam.name}</Text></View>
                    <View style={{width:'100%',height:'5%',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>alert('Add')} style={{zIndex:500,flexDirection:'row',alignItems:'center',position:'absolute',left:15,top:0}}>
                        <Image style={{width:35,height:35}} source={require('../../settingsIcons/plus.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('Settings')} style={{flexDirection:'row',alignItems:'center',position:'absolute',right:15,top:0}}>
                        <Image style={{width:35,height:35}} source={require('../../settingsIcons/setting.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{height:'75%',width:'100%',backgroundColor:'white',margin:20}}>
                    {sortedList.map((user,index)=>{
                        <Text key={index}>{user.name}</Text>
                    })}
                </View>
            </View>
        </View>
    )
}

// apiKey: "AIzaSyCubEvuePYKjY1LbFOA0Dief0endEF0SY8",
//     authDomain: "maps-8a2af.firebaseapp.com",
//     databaseURL: "https://maps-8a2af.firebaseio.com",
//     projectId: "maps-8a2af",
//     storageBucket: "maps-8a2af.appspot.com",
//     messagingSenderId: "626824452588",
//     appId: "1:626824452588:web:6db65e228561fca36108c9",
//     measurementId: "G-LPS8K196J8"