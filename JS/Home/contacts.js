import React,{ useState, useEffect } from 'react'
import Setting from '../Setting/setting'
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'

export default Contacts = (props) => {

    const [contacts,setcontacts] = useState([])
    const [contactAnimation] = useState(new Animated.Value(1))
    const [settingAnimation] = useState(new Animated.Value(0))
    const [newContactAnimation] = useState(new Animated.Value(0))

    getContacts = () => {
        fetch(`http://localhost:3000/account/${props.user.id}/contacts`)
        .then(res => {return res.json()})
        .then(contacts => { setcontacts(contacts) })
        .catch(err => console.warn('Contacts: ',err.message))
    }

    animateIt = (action) => {
        Animated.timing(contactAnimation,{
            toValue:0,
            timing:250,
            useNativeDriver:false
        }).start(()=>{
            if(action == 'Settings'){
                Animated.timing(settingAnimation,{
                    toValue:1,
                    timing:250,
                    useNativeDriver:false
                }).start()
            }else if(action == 'Add New'){
                Animated.timing(newContactAnimation,{
                    toValue:1,
                    timing:250,
                    useNativeDriver:false
                }).start()
            }
        })
    }

    importContact = (actionType) => {
        
    }

    return(
        <View style={{height:'55%',width:'100%'}}>
            <Animated.View style={{width:25,height:25,}}></Animated.View>
            <Animated.View style={{opacity:settingAnimation}}>
                    <Setting user={props.user}/>
            </Animated.View>
            <Animated.View style={{opacity:newContactAnimation}}>
                <Text>Lets Add New Contact</Text>
            </Animated.View>
            <Animated.View style={{opacity:contactAnimation,width:'100%',height:'70%',alignItems:'center'}}>
                {contacts.length != 0 ? contacts.map((contact)=>{
                    return(<View>
                        <Text>{contact.name}</Text>
                    </View>)
                }) : <View style={{height:'100%',width:'100%',alignItems:'center'}}><Text>No family group created yet!</Text></View>}
                <View style={{position:'absolute',bottom:0,width:'100%',height:0,alignItems:'center'}}>
                    <View style={{marginTop:'3%',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>animateIt('Add New')} style={{height:25,width:25,borderRadius:25,marginHorizontal:15}}>
                            <Image style={{height:30,width:30}} source={require('../Logo/add.png')}/>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={()=>animateIt('Settings')} style={{height:25,width:25,borderRadius:25,marginHorizontal:15}}>
                            <Image style={{height:30,width:30}} source={require('../settingsIcons/setting.png')}/>
                        </TouchableOpacity>   
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}