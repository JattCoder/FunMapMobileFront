import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../actions/register/register'
import { resregister } from '../../actions/register/resregister'
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import DeviceInfo from 'react-native-device-info';

const Register = (props) => {

    const[name,setname] = useState('')
    const[email,setemail] = useState('')
    const[phone,setphone] = useState('')
    const[photo,setphoto] = useState('')
    const[pass,setpass] = useState('')
    const[rpass,setrpass] = useState('')
    const[code,setcode] = useState('')
    const[registerLoad,setregisterLoad] = useState(false)
    const dispatch = useDispatch()

    RegisterAttempt = () => {
        if(name == '' || email == '' || pass == '' || rpass == '' || code == ''){
            if(name == '') alert('Name field is empty')
            else if(email == '') alert('Email field is empty')
            else if(pass == '') alert('Password field is empty')
            else if(rpass == '') alert('Re-Pass field is empty')
            else if(code == '') alert('Code field is empty')
        }
        else if(pass != rpass) alert('Password does not Match')
        else if(pass.length <= 5) alert('Password too short')
        else{
            setregisterLoad(true)
            DeviceInfo.getMacAddress().then(mac => {
                dispatch(register(name,email,phone,photo,pass,code,'App',mac))
            });
        }
    }

    useSelector((state)=>{
        if(state.register.result == false && state.register.message != ''){
            alert(state.register.message)
            if(state.register.message == 'Account already Exists'){
                setTimeout(()=>{
                    props.navigation.navigate('Login')
                },3000)
            }
            dispatch(resregister())
            if(registerLoad == true) setregisterLoad(false)
        }else if(state.register.result == true){
            user = state.register.message
            props.navigation.navigate('ConfirmEmail', {user: user})
        }
    })

    return(
        <View style={Styles.Page}>
            <Text style={Styles.Heading}>Register</Text>
            <TouchableOpacity style={Styles.FirstBox}>
                <Text style={{color:'white'}}>Name </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.FirstInput} autoCapitalize = 'none' onChangeText={(e)=>setname(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'white'}}>Email  </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' onChangeText={(e)=>setemail(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'white'}}>Phone</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' onChangeText={(e)=>setphone(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'white'}}>Pass  </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.NextBox}>
                <Text style={{color:'white'}}>Pass  </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.NextInput} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setrpass(e)}/>
            </TouchableOpacity>
            <Text style={{color:'white',marginTop:20}}>Recovery Code: Use this code to recover your Account</Text>
            <Text style={{color:'white',fontStyle:'italic'}}>(Keep it Safe)</Text>
            <TouchableOpacity style={Styles.CodeBox}>
                <Text style={{color:'white'}}>Code </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.CodeInput} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setcode(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Register} onPress={()=>RegisterAttempt()}>
                {registerLoad == false ? <Text style={Styles.RegisterText}>Register</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
        </View>
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
        color:'white',
        marginTop:70,
    },
    FirstBox:{
        marginTop:70,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    FirstInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    NextBox:{
        marginTop:20,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    NextInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    CodeBox:{
        marginTop:5,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
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
        flexDirection:'row'
    },
    RegisterText:{
        padding:12,
        color:'black',
    },
})