import React,{ useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

export default Contacts = (props) => {

    const [contacts,setcontacts] = useState([])

    getContacts = () => {
        fetch(`http://localhost:3000/account/${props.user.id}/contacts`)
        .then(res => {return res.json()})
        .then(contacts => { setcontacts(contacts) })
        .catch(err => console.warn('Contacts: ',err.message))
    }

    useEffect(()=>getContacts())

    return(
        <View style={{width:'100%',height:'91%',alignItems:'center'}}>
            {contacts.length != 0 ? contacts.map((contact)=>{
                return(<View>
                    <Text>{contact.name}</Text>
                </View>)
            }):null}
            <View style={{marginTop:'10%',position:'absolute',bottom:0,width:'100%',height:'20%',alignItems:'center'}}>
                <Text>Import Contacts</Text>
                <View style={{marginTop:'3%',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>alert('Pressed Google')} style={{height:25,width:25,borderRadius:25,marginHorizontal:15}}>
                        <Image style={{height:35,width:35}} source={require('../Logo/Google.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('Pressed Facebook')} style={{height:25,width:25,borderRadius:25,marginHorizontal:15}}>
                        <Image style={{height:35,width:35}} source={require('../Logo/facebook.png')}/>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={()=>alert('Pressed Add New')} style={{height:25,width:25,borderRadius:25,marginHorizontal:15}}>
                        <Image style={{height:30,width:30}} source={require('../Logo/add.png')}/>
                    </TouchableOpacity>   
                </View> 
                <View style={{marginTop:'7%',borderRadius:25,backgroundColor:'#3498DB',width:'60%',height:'30%',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity>
                        <Text style={{color:'white'}}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}