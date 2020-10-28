import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

export default Invitations = (props) => {

    const [user,setUser] = useState({
        id:'',
        name:'',
        email:'',
        photo:'',
        phone:'',
    })

    useEffect(()=>{
        // fetch(`http://localhost:3000/account/${}/info`)
        // .then(res => {return res.json()})
        // .then(info => {
        //     if(info.result == true){
        //         setUser({
        //             id: info.message.id,
        //             name: info.message.name,
        //             email: info.message.email,
        //             photo: info.message.photo,
        //             phone: info.message.phone
        //         })
        //     }else{

        //     }
        // })
        // .catch(err => console.warn(err.message))
    })
    
    return(
        <View style={{height:'100%',width:'100%'}}>
            <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10}}>
                <Image style={{height:20,width:20}} source={require('../../settingsIcons/back.png')}/>
                <Text style={{fontSize:20,color:'white'}}>Family</Text>
            </View>
            <View style={{alignItems:'center',marginTop:10,height:Dimensions.get('screen').height/2.1,width:Dimensions.get('screen').width}}>
                {props.invitations.map((invitation)=>{
                    return <View>
                        <TouchableOpacity onPress={()=>{props.close()}}>
                            <Text>{invitation.gname}</Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>
        </View>
    )
}