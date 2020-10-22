import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import { View, TextInput, Text, ScrollView, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default SearchUser = (props) => {

    const [users,setUsers] = useState([])
    const [search,setSearch] = useState('')
    const [senderId,setSenderId] = useState('')
    const [action,setAction] = useState('')

    searchUser = (input) => {
        if(input.length > 0){
            fetch(`http://localhost:3000/account/search?search=${input}`)
            .then(res => {return res.json()})
            .then(data => {
                if(data.result == false){
                    alert(data.message)
                }else{
                    setSearch(input)
                    setUsers(data.message)
                }
            })
        }else{
            setSearch(input)
            setUsers([])
        }
    }

    sendInvitation = (input) => {
        //i need group name, group code, group id
        let url = new URL("http://localhost:3000/account/invite"),
            params = {sid: senderId, gid: props.groupId, email: input}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(res => {return res.json()})
        .then(data => {
            if(data.result == true){
                console.warn('Done')
            }else{
                console.warn('Failed')
            }
        })
    }

    useSelector((state)=>{
        if(senderId != state.login.message.id){
            setSenderId(state.login.message.id)
        }
    })


    return(
        <View style={{justifyContent:'center',alignItems:'center',width:'70%'}}>
            <Text style={{fontSize:25,color:'white'}}>New Family Member</Text>
            <View style={{flexDirection:'row',width:'100%',borderRadius:50,backgroundColor:'white',height:50,alignItems:'center',marginTop:'5%'}}>
                <Text style={{marginRight:'2%',marginLeft:'3%',fontSize:15}}>Search</Text>
                <TouchableOpacity style={{borderWidth:0.5,width:0,height:'60%',marginHorizontal:'2%'}}/>
                <TextInput style={{fontSize:15,width:Dimensions.get('screen').width/2.1}} autoCapitalize='none' placeholder={'Name / Email'} onChangeText={(e)=>searchUser(e)}/>
            </View>
            {search.length > 0 ? <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
                {users.length == 0 ? <View style={{justifyContent:'center',alignItems:'center',height:'80%',width:'100%'}}>
                <Text style={{color:'white',fontSize:20}}>Would you like us to Invite</Text>
                <Text style={{color:'white',fontSize:20}}>{search}</Text>
                <TouchableOpacity onPress={()=>sendInvitation(input)} style={{justifyContent:'center',alignItems:'center',borderRadius:25,backgroundColor:'black',width:200,height:35,marginTop:'5%'}}>
                    <Text style={{color:'white'}}>Yes</Text>
                </TouchableOpacity>
                </View>
                : <ScrollView showsVerticalScrollIndicator={false} style={{width:Dimensions.get('screen').width/1.07,height:Dimensions.get('screen').width/1.25,marginTop:'5%',borderRadius:10,shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(0,0,0,0.4)'}}>
                    <View style={{margin:'5%',width:'100%'}}>
                        {users.map((user)=>{
                            return <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginBottom:'3%'}}>
                                <View style={{height:40,width:40}}>
                                    {user.photo != '' ? <Image source={{ uri: user.image }} /> : <Uimage name={user.name} />}
                                </View>
                                <View style={{marginHorizontal:'2.5%',justifyContent:'center'}}>
                                    <Text style={{fontSize:13,color:'white'}}>{user.name}</Text>
                                    <Text style={{fontSize:13,color:'white'}}>{user.email}</Text>
                                </View>
                                <View style={{position:'absolute',right:5}}>
                                    <TouchableOpacity onPress={()=>sendInvitation(user.email)} style={{right:0,width:Dimensions.get('screen').width/10.3,height:Dimensions.get('screen').height/31.2,borderRadius:5,backgroundColor:'grey',justifyContent:'center',alignItems:'center'}}>
                                        {action == '' ? <Image style={{height:15,width:15}} source={require('../../settingsIcons/plus.png')}/>
                                        : <ActivityIndicator size='small'/>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        })}
                    </View>
                </ScrollView>}
            </View> : null}
        </View>
    )
}