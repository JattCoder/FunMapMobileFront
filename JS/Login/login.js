import React,{ useState } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../actions/login/login'
import { reslogin } from '../../actions/login/reslogin'
import Dialog from "react-native-dialog";
import DeviceInfo from 'react-native-device-info';


const Login = (props) => {
    const[loginLoad,setloginLoad] = useState(false)
    const[googleLoad,setgoogleLoad] = useState(false)
    const[tries,settries] = useState(0)
    const[message,setmessage] = useState('Detected Multiple Attempts, Would you like to recover your account?')
    const[email,setemail] = useState('')
    const[pass,setpass] = useState('')
    const dispatch = useDispatch()

    LoginAttempt = () => {
        if(email == '' || pass == ''){
            if(email == '') alert('Email field is empty')
            else if(pass == '') alert('Password field is empty')
        }else{
            settries(tries+1)
            if(loginLoad != true || googleLoad != true){
                setloginLoad(true)
                DeviceInfo.getMacAddress().then(mac => {
                    dispatch(login(email,pass,'App',mac))
                });
            }
        }
    }

    GoogleAttempt = () => {
        setgoogleLoad(true)
        setTimeout(()=>{
            setgoogleLoad(false)
            alert('Logging in with google')
        },5000)
        //dispatch(login(email,pass,'Google'))
    }

    cancelRecovery = () => {
        settries(0)
    }

    acceptRecovery = () => {
        settries(0)
        props.navigation.navigate('Recover')
    }

    register = () => {
        dispatch(reslogin())
        props.navigation.navigate('Register')
    }

    useSelector((state)=>{
        if(state.login.result == false && state.login.message != ''){
            if(state.login.message == 'Already loggedin, on another Device') {
                setmessage('Someone could be using your Account. Would you like to Recover it?')
                settries(4)
            }else alert(state.login.message)
            dispatch(reslogin())
        }else if(state.login.result == true){
            user = state.login.message
            if (user.confirmed == false) {
                props.navigation.navigate('ConfirmEmail',{user: user})
                dispatch(reslogin())
            }
            else{
                props.navigation.navigate('Home',{user: user})
            }
        }
        if(loginLoad == true) setloginLoad(false)
        if(googleLoad == true) setgoogleLoad(false)
    })

    return(
        <View style={Styles.Page}>
            {tries >= 4 ? <Dialog.Container visible={true}>
                <Dialog.Title>Account Recovery?</Dialog.Title>
                <Dialog.Description>{message}</Dialog.Description>
                <Dialog.Button label='Cancel' onPress={()=>cancelRecovery()}/>
                <Dialog.Button label='Recover' onPress={()=>acceptRecovery()}/>
            </Dialog.Container> : <Dialog.Container visible={false}>
                <Dialog.Title>Account Recovery?</Dialog.Title>
                <Dialog.Description>Detected Multiple Attempts, Would you like to recover your account?</Dialog.Description>
                <Dialog.Button label='Cancel' onPress={()=>cancelRecovery()}/>
                <Dialog.Button label='Recover' onPress={()=>acceptRecovery()}/>
            </Dialog.Container>}
            <Text style={Styles.Heading}>Welcome to New App</Text>
            <Image source={{uri:'https://images.app.goo.gl/REU5wKvQuZMF4YGL6'}}/>
            <TouchableOpacity style={Styles.EmailBox} activeOpacity={1}>
                <Text style={{color:'white'}}>Email</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.EmailInput} autoCapitalize = 'none' onChangeText={(e)=>setemail(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.PassBox} activeOpacity={1}>
                <Text style={{color:'white'}}>Pass </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.PassInput} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Login} onPress={()=>LoginAttempt()}>
                {loginLoad == false ? <Text style={Styles.LoginText}>Login</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Google} onPress={()=>{GoogleAttempt()}}>
                {googleLoad == false ? <Text style={Styles.GoogleText}>Login with Google</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
            <Text style={{marginTop:30,marginBottom:30,color:'white'}} onPress={()=>register()}>Register</Text>
        </View>
    )
}

export default Login
//lets create a new file for style and put it there so page looks short
const Styles = StyleSheet.create({
    Page:{
        height:'100%',
        width:'100%',
        backgroundColor:'#5810d8',
        justifyContent:'center',
        alignItems:'center'
    },
    Heading:{
        fontSize:25,
        color:'white',
        marginTop:150,
    },
    Google:{
        marginTop:20,
        borderRadius:25,
        backgroundColor:'white',
        height:45,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        width:250,
        flexDirection:'row'
    },
    GoogleText:{
        padding:12,
        color:'black'
    },
    Login:{
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
    LoginText:{
        padding:12,
        color:'black',
    },
    EmailBox:{
        marginTop:'70%',
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    PassBox:{
        marginTop:20,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    EmailInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    PassInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    }
})
