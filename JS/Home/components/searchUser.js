import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import { View, TextInput, Text, ScrollView, Dimensions, Image, FlatList, ActivityIndicator, TouchableOpacity, Animated } from 'react-native'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export default SearchUser = (props) => {

    const [users,setUsers] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [search,setSearch] = useState('')
    const [senderId,setSenderId] = useState('')
    const [action,setAction] = useState('')
    const [resultsHeight] = useState(new Animated.Value(0))
    const [resultsOpacity] = useState(new Animated.Value(0))

    getallUsers = () => {
        arr = []
        firebase.database().ref('Users/').on('value',snapShot => {
            for(let i in snapShot.val()){
                if(i != 'undefined') arr.push(snapShot.val()[i])
            }
            setAllUsers(arr)
        })
    }
    
    searchUser = (input) => {
        usrs = []
        if(input.length > 0){
            allUsers.map(usr => {
                if(usr.name.toLowerCase() == input.toLowerCase() || usr.email.toLowerCase() == input.toLowerCase() || usr.name.toLowerCase().includes(input.toLowerCase())){
                    if(!usrs.includes(usr) && usr.id != props.myId) usrs.push(usr)
                }
            })
            setUsers(usrs)
        }else{
            setSearch(input)
            setUsers([])
        }
    }
    sendInvitation = (input) => {
        firebase.database().ref('Invitations/'+selectedUID+'/'+props.groupId).set({
            gid:props.groupId,
            gname:props.groupName,
            gcode:props.groupCode,
            sender:senderId
        }).then((data)=>{
            //success callback
            setAction('')
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }

    useEffect(()=>{
        getallUsers()
    },[props.ID])


    return(
        <View style={{width:'100%',height:'100%',alignItems:'center'}}>
            <View style={{justifyContent:'center',alignItems:'center',width:'70%'}}>
            <View style={{width:'150%',height:'13%',marginTop:'3%',justifyContent:'center',alignItems:'center'}}>
                    <TextInput placeholder='Email | Name' onChangeText={(e)=>searchUser(e)} placeholderTextColor='grey' style={{backgroundColor:'rgba(255,255,255,0.3)',color:'black',width:'70%',height:'100%',borderRadius:10,paddingHorizontal:'3%'}}/>
            </View>
            {users.length == 0 && search.length > 0 ? <View style={{justifyContent:'center',alignItems:'center',height:'80%',width:'100%'}}>
                    <Text style={{color:'white',fontSize:20}}>Would you like us to Invite</Text>
                    <Text style={{color:'white',fontSize:20}}>{search}</Text>
                    <TouchableOpacity onPress={()=>sendInvitation(input)} style={{justifyContent:'center',alignItems:'center',borderRadius:25,backgroundColor:'black',width:200,height:35,marginTop:'5%'}}>
                        <Text style={{color:'white'}}>Yes</Text>
                    </TouchableOpacity>
                </View>
                : <ScrollView showsVerticalScrollIndicator={false} style={{width:'135%',height:'78%',marginTop:'5%',borderRadius:10,shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(0,0,0,0.4)'}}>
                    <View style={{margin:'5%',width:'100%',height:'20%'}}>
                        {users.map((user)=>{
                            return <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginBottom:'3%'}}>
                                <View style={{height:50,width:50}}>
                                    {user.photo != '' ? <Image source={{ uri: user.image }} /> : <Uimage name={user.name} />}
                                </View>
                                <View style={{marginHorizontal:'2.5%',justifyContent:'center'}}>
                                    <Text style={{fontSize:20,color:'white'}}>{user.name}</Text>
                                    <Text style={{fontSize:13,color:'white'}}>{user.email}</Text>
                                </View>
                                {!props.members.includes(user.id) ? <View style={{position:'absolute',right:5}}>
                                    <TouchableOpacity onPress={()=>sendInvitation(user.email)} style={{right:0,width:Dimensions.get('screen').width/10.3,height:Dimensions.get('screen').height/31.2,borderRadius:5,backgroundColor:'grey',justifyContent:'center',alignItems:'center'}}>
                                        {action == '' ? <Image style={{height:15,width:15}} source={require('../../settingsIcons/plus.png')}/>
                                        : <ActivityIndicator size='small'/>}
                                    </TouchableOpacity>
                                </View> : null}
                            </View>
                        })}
                    </View>
                </ScrollView>}
            </View>
        </View>
    )
}