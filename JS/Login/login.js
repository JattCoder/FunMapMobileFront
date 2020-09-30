import React,{ useState } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../actions/login/login'
import { reslogin } from '../../actions/login/reslogin'
import Dialog from "react-native-dialog";
import DeviceInfo from 'react-native-device-info'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '9700651872-vmcr09fjj0qq68niomge9ar38hgt7p6u.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });


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

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

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
                <TextInput style={[Styles.EmailInput, {height: Platform.OS == 'android' ? 40 : 20}]} autoCapitalize = 'none' onChangeText={(e)=>setemail(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.PassBox} activeOpacity={1}>
                <Text style={{color:'white'}}>Pass </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={[Styles.PassInput, {height: Platform.OS == 'android' ? 40 : 20}]} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Login} onPress={()=>LoginAttempt()}>
                {loginLoad == false ? <Text style={Styles.LoginText}>Login</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Google} onPress={()=>{signIn()}}>
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
        marginTop:'60%',
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        alignItems:'center'
    },
    PassBox:{
        marginTop:20,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        alignItems:'center'
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
