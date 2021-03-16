import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../actions/register/register'
import { resregister } from '../../actions/register/resregister'
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import LinearGradient from 'react-native-linear-gradient'

const Register = (props) => {

    const[name,setname] = useState('')
    const[email,setemail] = useState('')
    const[phone,setphone] = useState('')
    const[photo,setphoto] = useState('')
    const[pass,setpass] = useState('')
    const[rpass,setrpass] = useState('')
    const[code,setcode] = useState('')
    const[registerLoad,setregisterLoad] = useState(false)
    const[res,setRes] = useState({
        result: false,
        message: {}
    })
    const dispatch = useDispatch()

    RegisterAttempt = () => {
        if(name == '' || email == '' || pass == '' || rpass == ''){
            if(name == '') alert('Name field is empty')
            else if(email == '') alert('Email field is empty')
            else if(pass == '') alert('Password field is empty')
            else if(rpass == '') alert('Re-Pass field is empty')
        }
        else if(pass != rpass) alert('Password does not Match')
        else if(pass.length <= 5) alert('Password too short')
        else{
            setregisterLoad(true)
            DeviceInfo.getMacAddress().then(mac => {
                dispatch(register(name,email,phone,photo,pass,mac))
            });
        }
    }

    useSelector((state)=>{
        if(res != state.login) {
            console.warn('Creating Account: ',state.login.result)
            setRes(state.login)
            if(state.login.result){
                console.warn('Successfully Created Account')
                props.close()
            }else if(Object.keys(state.login.message).length > 0 && state.login.result == false){
                if(registerLoad == true) setregisterLoad(false)
                console.warn(state.login.message.error)
            }
        }
    })

    return(
        <LinearGradient colors={['white','white','white']} style={Styles.Page}>
            <Text style={Styles.Heading}>Register</Text>
            <TouchableOpacity style={Styles.FirstBox}>
                <Text style={{color:'black',fontWeight:'bold'}}>Name </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'#f5f5f5'}}/>
                <TextInput style={Styles.FirstInput} autoCapitalize = 'none' onChangeText={(e)=>setname(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'black',fontWeight:'bold'}}>Email  </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'#f5f5f5'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' onChangeText={(e)=>setemail(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'black',fontWeight:'bold'}}>Phone</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'#f5f5f5'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' onChangeText={(e)=>setphone(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'black',fontWeight:'bold'}}>Pass   </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'#f5f5f5'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'black',fontWeight:'bold'}}>Pass   </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'#f5f5f5'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setrpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Register} onPress={()=>RegisterAttempt()}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#1CB5E0','#1CB5E0','#1CB5E0']} style={{width:'100%',height:'100%',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                    {registerLoad == false ? <Text style={Styles.RegisterText}>Register</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.close()} style={{marginTop:'7%'}}>
                <Text>Cancel</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Register

const Styles = StyleSheet.create({
    Page:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5810d8',
    },
    Heading:{
        fontSize:25,
        color:'black',
        marginTop:70,
    },
    FirstBox:{
        marginTop:70,
        borderRadius:10,
        borderColor:'grey',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        shadowColor: "#1CB5E0",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    FirstInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'black'
    },
    NextBox:{
        marginTop:20,
        borderRadius:10,
        borderColor:'grey',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        shadowColor: "#1CB5E0",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    NextInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'black'
    },
    CodeBox:{
        marginTop:5,
        borderRadius:10,
        borderColor:'#f5f5f5',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        shadowColor: "#1CB5E0",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    CodeInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    Register:{
        marginTop:60,
        borderRadius:25,
        backgroundColor:'white',
        height:45,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        width:250,
        flexDirection:'row',
        shadowColor: "#1CB5E0",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    RegisterText:{
        padding:12,
        color:'#f5f5f5',
    },
})