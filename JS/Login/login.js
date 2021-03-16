import React,{ useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Dimensions, Animated } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { reslogin } from '../../actions/login/reslogin'
//import { settings } from '../../actions/settings/settings'
import Dialog from "react-native-dialog"
import firebase from 'firebase'
import LinearGradient from 'react-native-linear-gradient'
import DeviceInfo from 'react-native-device-info'
import auth from '@react-native-firebase/auth'
import Shimmer from 'react-native-shimmer'
import Register from '../Register/register'
import Home from '../Home/home'

const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

const Login = (props) => {
    const[googleLoad,setgoogleLoad] = useState(false)
    const[tries,settries] = useState(0)
    const[message,setmessage] = useState('Detected Multiple Attempts, Would you like to recover your account?')
    const[email,setemail] = useState('')
    const[pass,setpass] = useState('')
    const[intro] = useState(new Animated.Value(0))
    const[intrOpacity] = useState(new Animated.Value(0))
    const[emailPassHeight] = useState(new Animated.Value(0))
    const[emailPassOpacity] = useState(new Animated.Value(0))
    const[socialHeight] = useState(new Animated.Value(0))
    const[socialOpacity] = useState(new Animated.Value(0))
    const[HoldGoogle] = useState(new Animated.Value(60))
    const[HoldFacebook] = useState(new Animated.Value(60))
    const[HoldTwitter] = useState(new Animated.Value(60))
    const[GoogleOpacity] = useState(new Animated.Value(0))
    const[FacebookOpacity] = useState(new Animated.Value(0))
    const[TwitterOpacity] = useState(new Animated.Value(0))
    const[GoogleBottom] = useState(new Animated.Value(-150))
    const[FacebookBottom] = useState(new Animated.Value(-150))
    const[TwitterBottom] = useState(new Animated.Value(-150))
    const[GoogleShadow] = useState(new Animated.Value(16))
    const[FacebookShadow] = useState(new Animated.Value(16))
    const[TwitterShadow] = useState(new Animated.Value(16))
    const[GoogleShadowColor] = useState(new Animated.Value(0))
    const[FacebookShadowcolor] = useState(new Animated.Value(0))
    const[TwitterShadowColor] = useState(new Animated.Value(0))
    const[LoginSize] = useState(new Animated.Value(2))
    const[LoginOpacity] = useState(new Animated.Value(1))
    const[LoadSize] = useState(new Animated.Value(0))
    const[LoadOpacity] = useState(new Animated.Value(0))
    const[LoginLoad] = useState(new Animated.Value(0))
    const[loginPageHeight] = useState(new Animated.Value(Dimensions.get('screen').height))
    const[LoginPageOpacity] = useState(new Animated.Value(1))
    const[RegisterPageHeight] = useState(new Animated.Value(0))
    const[RegisterPageOpacity] = useState(new Animated.Value(0))
    const[HomePageHeight] = useState(new Animated.Value(0))
    const[HomePageOpacity] = useState(new Animated.Value(0))
    const[doneLoading,setDoneLoading] = useState(false)
    const[selection,setSelection] = useState(false)
    const[user,setUser] = useState({})
    const dispatch = useDispatch()

    appIntro = () => {
        Animated.timing(intrOpacity,{
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start(()=>{
            auth().onAuthStateChanged(usr => {
                if(usr){
                    firebase.database().ref(`Users/${usr.email.replace(punctuation,'').replace(spaceRE,'')}`)
                    .once('value',snapshot => {
                        setUser(snapshot.val())
                        letsGoHome()
                    })
                }else{
                    Animated.parallel([
                        Animated.timing(intro,{
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: false
                        }),
                        Animated.timing(emailPassHeight,{
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: false
                        }),
                        Animated.timing(emailPassOpacity,{
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: false
                        })
                    ]).start()
                }
            })
        })
    }

    useEffect(()=>{
        appIntro()
    },[])

    letsGoHome = () => {
        if(Object.keys(user).length > 0) {
            openHome()
        }
    }

    LoginAttempt = () => {
        if(email == '' || pass == ''){
            if(email == '') alert('Email field is empty')
            else if(pass == '') alert('Password field is empty')
        }else{
            settries(tries+1)
            DeviceInfo.getMacAddress().then(mac => {
                emailPassLogin(mac)
            });
        }
    }

    emailPassLogin = (mac) => {

        animateLoginLoad = () => {
            Animated.timing(LoginLoad,{
                toValue: 2,
                duration: 1000,
                useNativeDriver: false
            }).start(()=>{
                Animated.timing(LoginLoad,{
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false
                }).start(()=>{if(!doneLoading) animateLoginLoad()})
            })
        }

        Animated.timing(LoginSize,{
            toValue: 2,
            duration: 100,
            useNativeDriver: false
        }).start(()=>{
            Animated.parallel([
                Animated.timing(LoginSize,{
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }),
                Animated.timing(LoginOpacity,{
                    toValue:0,
                    duration:150,
                    useNativeDriver:false
                })
            ]).start(()=>{
                Animated.parallel([
                    Animated.timing(LoadSize,{
                        toValue:2,
                        duration:150,
                        useNativeDriver:false
                    }),
                    Animated.timing(LoadOpacity,{
                        toValue:1,
                        duration:50,
                        useNativeDriver:false
                    })
                ]).start(()=>{
                    animateLoginLoad()
                })
            })
        })

        auth()
        .signInWithEmailAndPassword(email,pass)
        .then((usr)=>{
            firebase.database().ref(`Users/`+email.replace(punctuation,'').replace(spaceRE,''))
            .on('value', snapshot => {
                setUser(snapshot.val())
                // if(snapshot.val().mac == mac) dispatch(login(snapshot,))
                // else alert('First Log-Out from other device')
            })
        })
        .catch((err)=>{
            if(err.code === 'auth/wrong-password'){
                console.warn('Incorrect Password')
            }else if(err.code === 'auth/user-not-found'){
                console.warn('Account Not Found')
            }else if(err.code === 'auth/invalid-email'){
                console.warn('Invalid Email')
            }
        })
    }

    openHome = () => {
        Animated.timing(LoginPageOpacity,{
            toValue:0,
            duration:500,
            useNativeDriver:false
        }).start(()=>Animated.timing(loginPageHeight,{
            toValue:0,
            duration:10,
            useNativeDriver:false
        }).start(()=>Animated.timing(HomePageHeight,{
            toValue:Dimensions.get('screen').height,
            duration:10,
            useNativeDriver:false
        }).start(()=>Animated.timing(HomePageOpacity,{
            toValue:1,
            duration:500,
            useNativeDriver:false
        }).start())))
     }

     closeHome = () => {
        Animated.timing(HomePageOpacity,{
            toValue:0,
            duration:500,
            useNativeDriver:false
        }).start(()=>Animated.timing(HomePageHeight,{
            toValue:0,
            duration:10,
            useNativeDriver:false
        }).start(()=>Animated.timing(loginPageHeight,{
            toValue:Dimensions.get('screen').height,
            duration:10,
            useNativeDriver:false
        }).start(()=>Animated.timing(LoginPageOpacity,{
            toValue:1,
            duration:500,
            useNativeDriver:false
        }).start())))
     }

    openRegister = () => {
       Animated.timing(LoginPageOpacity,{
           toValue:0,
           duration:500,
           useNativeDriver:false
       }).start(()=>Animated.timing(loginPageHeight,{
           toValue:0,
           duration:10,
           useNativeDriver:false
       }).start(()=>Animated.timing(RegisterPageHeight,{
           toValue:Dimensions.get('screen').height,
           duration:10,
           useNativeDriver:false
       }).start(()=>Animated.timing(RegisterPageOpacity,{
           toValue:1,
           duration:500,
           useNativeDriver:false
       }).start())))
    }

    closeRegister = () => {
        Animated.timing(RegisterPageOpacity,{
            toValue:0,
            duration:500,
            useNativeDriver:false
        }).start(()=>Animated.timing(RegisterPageHeight,{
            toValue:0,
            duration:10,
            useNativeDriver:false
        }).start(()=>Animated.timing(loginPageHeight,{
            toValue:Dimensions.get('screen').height,
            duration:10,
            useNativeDriver:false
        }).start(()=>Animated.timing(LoginPageOpacity,{
            toValue:1,
            duration:500,
            useNativeDriver:false
        }).start())))
     }

    const introInterpolate = intro.interpolate({
        inputRange: [0, 1],
        outputRange: ['100%','50%']
    })

    const emailPassInterpolate = emailPassHeight.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%','100%']
    })
    const socialInterpolate = socialHeight.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })
    const loginLoadActionInterpolate = LoginLoad.interpolate({
        inputRange:[1, 2],
        outputRange:['180deg', '360deg']
    })
    const loginSizeInterpolate = LoginSize.interpolate({
        inputRange:[0, 1, 2],
        outputRange:['0%', '120%', '100%']
    })
    const loadSizeInterpolate = LoadSize.interpolate({
        inputRange:[0, 1, 2],
        outputRange:['0%', '120%', '100%']
    })
 
    showSocial = () => {
        Animated.parallel([
            Animated.timing(socialHeight,{
                toValue: 1,
                duration:200,
                useNativeDriver: false
            }),
            Animated.timing(socialOpacity,{
                toValue: 1,
                duration: 200, 
                useNativeDriver: false
            }),
            Animated.timing(emailPassHeight,{
                toValue: 0,
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(emailPassOpacity,{
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            })
        ]).start(()=>{
            Animated.parallel([
                Animated.timing(GoogleOpacity,{
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: false
                }),
                Animated.timing(GoogleBottom,{
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                })
            ]).start(()=>{
                Animated.parallel([
                    Animated.timing(FacebookOpacity,{
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(FacebookBottom,{
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    })
                ]).start(()=>{
                    Animated.parallel([
                        Animated.timing(TwitterOpacity,{
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: false
                        }),
                        Animated.timing(TwitterBottom,{
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: false
                        })
                    ]).start(()=>{
                        if(selection != false) setSelection(false)
                        animateSocialButtons()
                    })
                })
            })
        })
    }

    hideSocial = () => {
        Animated.parallel([
            Animated.timing(GoogleOpacity,{
                toValue: 0,
                duration: 50,
                useNativeDriver: false
            }),
            Animated.timing(GoogleBottom,{
                toValue: -200,
                duration: 100,
                useNativeDriver: false
            })
        ]).start(()=>{
            Animated.parallel([
                Animated.timing(FacebookOpacity,{
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: false
                }),
                Animated.timing(FacebookBottom,{
                    toValue: -200,
                    duration: 100,
                    useNativeDriver: false
                })
            ]).start(()=>{
                Animated.parallel([
                    Animated.timing(TwitterOpacity,{
                        toValue: 0,
                        duration: 50,
                        useNativeDriver: false
                    }),
                    Animated.timing(TwitterBottom,{
                        toValue: -200,
                        duration: 100,
                        useNativeDriver: false
                    })
                ]).start(()=>{
                    Animated.parallel([
                        Animated.timing(socialHeight,{
                            toValue: 0,
                            duration:150,
                            useNativeDriver: false
                        }),
                        Animated.timing(socialOpacity,{
                            toValue: 0,
                            duration: 150, 
                            useNativeDriver: false
                        }),
                        Animated.timing(emailPassHeight,{
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: false
                        }),
                        Animated.timing(emailPassOpacity,{
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: false
                        })
                    ]).start(()=>setSelection(true))
                })
            })
        })
    }

    animateSocialButtons = () => {
        setTimeout(()=>{
            Animated.timing(GoogleBottom,{
                toValue:10,
                duration:150,
                useNativeDriver: false
            }).start(()=>{
                Animated.timing(GoogleBottom,{
                    toValue:0,
                    duration:150,
                    useNativeDriver: false
                }).start(()=>{
                    setTimeout(()=>{
                        Animated.timing(FacebookBottom,{
                            toValue:10,
                            duration:150,
                            useNativeDriver: false
                        }).start(()=>{
                            Animated.timing(FacebookBottom,{
                                toValue:0,
                                duration:150,
                                useNativeDriver: false
                            }).start(()=>{
                                setTimeout(()=>{
                                    Animated.timing(TwitterBottom,{
                                        toValue:10,
                                        duration:150,
                                        useNativeDriver: false
                                    }).start(()=>{
                                        Animated.timing(TwitterBottom,{
                                            toValue:0,
                                            duration:150,
                                            useNativeDriver: false
                                        }).start(()=>{
                                            if(!selection) animateSocialButtons()
                                        })
                                    })
                                },400)
                            })
                        })
                    },400)
                })
            })
        },700)
    }

    const GoogleShadowInterpolate = GoogleShadowColor.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: ['black','#4285F4', '#EA4335', '#FBBC05', '#34A853']
    })

    const FacebookShadowInterpolate = FacebookShadowcolor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['black' ,'#3b5998', '#3b5998']
    })

    const TwitterShadowInterpolate = TwitterShadowColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['black','#3b5998', '#00acee']
    })

    cancelRecovery = () => {
        settries(0)
    }

    acceptRecovery = () => {
        settries(0)
        props.navigation.navigate('Recover')
    }

    return(
        <View>
            <Animated.View style={{height:loginPageHeight,width:Dimensions.get('screen').width, opacity:LoginPageOpacity}}>
            <LinearGradient colors={['white','white','white']} style={Styles.Page}>
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
                <Animated.View style={{position:'absolute', top:0, marginTop:introInterpolate,opacity:intrOpacity}}>
                    <Text style={Styles.Heading}>Fun Map</Text>
                </Animated.View>
                <View style={{width: Dimensions.get('screen').width,height: Dimensions.get('screen').height/1.5,position:'absolute',bottom:0}}>
                    <Animated.View style={{height:emailPassInterpolate,width:'100%',position:'absolute',bottom:0,opacity:emailPassOpacity,justifyContent:'center',alignItems:'center'}}>
                        <KeyboardAvoidingView behavior="padding">
                            <TouchableOpacity style={Styles.EmailBox} activeOpacity={1}>
                                <Text style={{color:'#7F7FD5',fontWeight:'bold'}}>Email</Text>
                                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:0,borderColor:'#7F7FD5'}}/>
                                <TextInput style={[Styles.EmailInput, {height: Platform.OS == 'android' ? 40 : 20}]} autoCapitalize = 'none' onChangeText={(e)=>setemail(e)}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.PassBox} activeOpacity={1}>
                                <Text style={{color:'#7F7FD5',fontWeight:'bold'}}>Pass </Text>
                                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:0,borderColor:'#7F7FD5'}}/>
                                <TextInput style={[Styles.PassInput, {height: Platform.OS == 'android' ? 40 : 20}]} autoCapitalize = 'none' secureTextEntry={true} onChangeText={(e)=>setpass(e)}/>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                        <TouchableOpacity style={Styles.Login} activeOpacity={1} onPress={()=>LoginAttempt()}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#1CB5E0','#1CB5E0','#1CB5E0']} style={{width:'100%',height:'100%',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:'100%',height:'100%'}}>
                                <Animated.View style={{height:loginSizeInterpolate,width:loginSizeInterpolate,opacity:LoginOpacity,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={Styles.LoginText}>Login</Text>
                                </Animated.View>
                                <Animated.View style={{height:loadSizeInterpolate,width:loadSizeInterpolate,opacity:LoadOpacity,justifyContent:'center',alignItems:'center'}}>
                                    <Animated.View style={{position:'absolute',transform: [{ rotate: loginLoadActionInterpolate}]}}>
                                        <LinearGradient colors={['#f7797d','#FBD786','#f7797d']} style={{height:35,width:35,borderRadius:50,justifyContent:'space-evenly'}}/>
                                    </Animated.View>
                                    <TouchableOpacity style={{height:30,width:30,backgroundColor:'#00B4DB',borderRadius:50,justifyContent:'center',alignItems:'center',zIndex:100}} activeOpacity={1}>
                                        <Text style={{fontWeight:'bold',fontSize:12,color:'white'}}>FM</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',height:'15%',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>openRegister()}><Text style={{color:'#7F7FD5',marginRight:'5%'}}>Register</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={{height:20,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                            <Text style={{color:'#7F7FD5',marginLeft:'5%'}}>Recover</Text>
                        </View>
                        <TouchableOpacity style={{width:'100%',height:'20%'}} onPress={()=>showSocial()}>
                            <Shimmer><Text style={{fontSize:15,fontWeight:'bold'}}>Login With</Text></Shimmer>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{height:socialInterpolate,width:'100%',opacity:socialOpacity,justifyContent:'center',alignItems:'center',bottom:0,position:'absolute'}}>
                        <View style={{width:'65%',flexDirection:'row',position:'absolute',bottom:'20%',alignItems:'center',justifyContent:'space-between'}}>
                            <Animated.View style={[Styles.SociaLogin,{height:HoldGoogle,width:HoldGoogle,shadowRadius:GoogleShadow,shadowColor:GoogleShadowInterpolate}]}>
                                <Animated.View style={{opacity:GoogleOpacity,position:'absolute',bottom:GoogleBottom,width:'100%',height:'100%'}}>
                                    <TouchableOpacity activeOpacity={1} disabled={false} onPress={()=>alert('google')} onPressIn={()=>HoldGooglePlay()} onPressOut={()=>Release('Google')}>
                                        <Image style={{height:'100%',width:'100%'}} source={require('../Logo/Google.png')}/>
                                    </TouchableOpacity>
                                </Animated.View>
                            </Animated.View>
                            <Animated.View style={[Styles.SociaLogin,{height:HoldFacebook,width:HoldFacebook,shadowRadius:FacebookShadow,shadowColor:FacebookShadowInterpolate}]}>
                                <Animated.View style={{opacity:FacebookOpacity,position:'absolute',bottom:FacebookBottom,width:'100%',height:'100%'}}>
                                    <TouchableOpacity activeOpacity={1} disabled={false} onPress={()=>{alert('facebook')}} onPressIn={()=>HoldFacebookPlay()} onPressOut={()=>Release('Facebook')}>
                                        <Image style={{height:'100%',width:'100%'}} source={require('../Logo/facebook.png')}/>
                                    </TouchableOpacity>
                                </Animated.View>
                            </Animated.View>
                            <Animated.View style={[Styles.SociaLogin,{height:HoldTwitter,width:HoldTwitter,shadowRadius:TwitterShadow,shadowColor:TwitterShadowInterpolate}]}>
                                <Animated.View style={{opacity:TwitterOpacity,position:'absolute',bottom:TwitterBottom,width:'100%',height:'100%'}}>
                                    <TouchableOpacity activeOpacity={1} disabled={false} onPress={()=>alert('twitter')} onPressIn={()=>HoldTwitterPlay()} onPressOut={()=>Release('Twitter')}>
                                        <Image style={{height:'100%',width:'100%'}} source={require('../Logo/twitter.png')}/>
                                    </TouchableOpacity>
                                </Animated.View>
                            </Animated.View>
                        </View>
                        <TouchableOpacity onPress={()=>hideSocial()}>
                            <Shimmer><Text style={{fontSize:15,fontWeight:'bold'}}>Email - Password</Text></Shimmer>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </LinearGradient>
        </Animated.View>
        <Animated.View style={{height:HomePageHeight,opacity:HomePageOpacity,width:Dimensions.get('screen').width}}>
            <Home user={user} logout={()=>closeHome()}/>
        </Animated.View>
        <Animated.View style={{height:RegisterPageHeight,opacity:RegisterPageOpacity,width:Dimensions.get('screen').width}}>
            <Register close={()=>closeRegister()}/>
        </Animated.View>
        </View>
    )
}

export default Login
//lets create a new file for style and put it there so page looks short
const Styles = StyleSheet.create({
    frame:{
        height:Dimensions.get('screen').height,
        width:Dimensions.get('screen').width
    },
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
        color:'#00B4DB',
        fontSize:25,
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
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
        marginTop:'50%',
        borderRadius:10,
        borderColor:'#7F7FD5',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        alignItems:'center',
        shadowColor: "#7F7FD5",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    PassBox:{
        marginTop:'-17%',
        borderRadius:10,
        borderColor:'#7F7FD5',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        alignItems:'center',
        shadowColor: "#7F7FD5",
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
        color:'#7F7FD5',
    },
    PassInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'#7F7FD5'
    },
    SociaLogin:{
        borderRadius:50,
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        elevation:24,
    }
})
