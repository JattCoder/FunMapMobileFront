import React,{ useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../actions/login/login'
import { reslogin } from '../../actions/login/reslogin'
import { settings } from '../../actions/settings/settings'
import Dialog from "react-native-dialog"
import firebase from 'firebase'
import LinearGradient from 'react-native-linear-gradient'
import DeviceInfo from 'react-native-device-info'

const Login = (props) => {
    const[loginLoad,setloginLoad] = useState(false)
    const[googleLoad,setgoogleLoad] = useState(false)
    const[tries,settries] = useState(0)
    const[message,setmessage] = useState('Detected Multiple Attempts, Would you like to recover your account?')
    const[email,setemail] = useState('')
    const[pass,setpass] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        if (!firebase.apps.length) {
            firebase.initializeApp({
                databaseURL: "https://maps-8a2af.firebaseio.com",
                projectId: "maps-8a2af"
            });
        }
    })

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
            } else{
                if(state.settings.user_id == -1) dispatch(settings(user.id))
                else props.navigation.navigate('Home',{user: user})
            }
        }
        if(loginLoad == true) setloginLoad(false)
        if(googleLoad == true) setgoogleLoad(false)
    })

    return(
        <LinearGradient colors={['#00B4DB','#1CB5E0','#000046']} style={Styles.Page}>
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
                <Text style={{color:'#f5f5f5',fontWeight:'bold'}}>Email</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:0,borderColor:'#f5f5f5'}}/>
                <TextInput style={[Styles.EmailInput, {height: Platform.OS == 'android' ? 40 : 20}]} autoCapitalize = 'none' onChangeText={(e)=>setemail(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.PassBox} activeOpacity={1}>
                <Text style={{color:'#f5f5f5',fontWeight:'bold'}}>Pass </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:0,borderColor:'#f5f5f5'}}/>
                <TextInput style={[Styles.PassInput, {height: Platform.OS == 'android' ? 40 : 20}]} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Login} onPress={()=>LoginAttempt()}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#1CB5E0','#1CB5E0','#1CB5E0']} style={{width:'100%',height:'100%',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                {loginLoad == false ? <Text style={Styles.LoginText}>Login</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
                </LinearGradient>
            </TouchableOpacity>
            <Text style={{marginTop:30,marginBottom:30,color:'white'}} onPress={()=>register()}>Register</Text>
        </LinearGradient>
    )
}

export default Login
//lets create a new file for style and put it there so page looks short
const Styles = StyleSheet.create({
    Page:{
        height:Dimensions.get('screen').height,
        width:Dimensions.get('screen').width,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0
    },
    Heading:{
        fontSize:20,
        color:'white',
        marginTop:'30%',
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
        marginTop:'10%',
        borderRadius:25,
        backgroundColor:'#00B4DB',
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
    LoginText:{
        padding:12,
        color:'#f5f5f5',
    },
    EmailBox:{
        marginTop:'60%',
        borderRadius:10,
        borderColor:'#f5f5f5',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        alignItems:'center',
        shadowColor: "#f5f5f5",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    PassBox:{
        marginTop:20,
        borderRadius:10,
        borderColor:'#f5f5f5',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        alignItems:'center',
        shadowColor: "#f5f5f5",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    EmailInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white',
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
