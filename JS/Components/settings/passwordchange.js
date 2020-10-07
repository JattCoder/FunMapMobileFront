import React,{ useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'

export default Passwordchange = () => {

    const [oldPass,setOldPass] = useState('')
    const [newPass,setNewPass] = useState('')
    const [rNewPass,setRNewPass] = useState('')

    return(
        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <Text>Change Password</Text>
            <TextInput onChangeText={(e)=>setOldPass(e)} placeholder='Old Password'></TextInput>
            <TextInput onChangeText={(e)=>setNewPass(e)} placeholder='New Password'></TextInput>
            <TextInput onChangeText={(e)=>setRNewPass(e)} placeholder='New Password'></TextInput>
            <TouchableOpacity style={{bottom:0,width:'60%',height:'7%',borderRadius:50,backgroundColor:'#00BFFF',marginTop:'15%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white'}}>Update</Text>
            </TouchableOpacity>
        </View>
    )
}