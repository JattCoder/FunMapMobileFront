import React,{ useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Shimmer from 'react-native-shimmer';
import Passwordchange from './passwordchange'
import Editaccount from './editaccount'
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, Switch, AsyncStorage } from 'react-native'

export default Account = (props) => {

    const [action,setAction] = useState(true)
    const [size] = useState(new Animated.Value(80))
    const [hide] = useState(new Animated.Value(1))
    const [editSize] = useState(new Animated.Value(70))
    const [imgSize] = useState(new Animated.Value(50))
    const [interpolatecolor] = useState(new Animated.Value(0))
    const [editHeight] = useState(new Animated.Value(0))
    const [editWidth] = useState(new Animated.Value(0))
    const [passChangeOpacity] = useState(new Animated.Value(0))
    const [passChangeHeight] = useState(new Animated.Value(0))
    const [editAccountOpacity] = useState(new Animated.Value(0))
    const [editAccountHeight] = useState(new Animated.Value(0))
    const [accountPageOpacity] = useState(new Animated.Value(1))
    const [close,setClose] = useState(false)
    const [autoLogin,setAutoLogin] = useState(false)
    const interpolateColor = interpolatecolor.interpolate({
        inputRange: [0,150],
        outputRange: ['#00BFFF','#2C5364']
    })

    animateIt = () => {
        Animated.parallel([
            Animated.timing(size,{
                toValue:190,
                duration:1500,
                useNativeDriver:false
            }),
            Animated.timing(hide,{
                toValue:0,
                duration:1500,
                useNativeDriver:false
            })
        ]).start(()=>{
            Animated.timing(size,{
                toValue:80,
                timing:100,
                useNativeDriver:false
            }).start(()=>{
                Animated.timing(hide,{
                    toValue:1,
                    timing:100,
                    useNativeDriver:false
                }).start()
            })
        })
    }

    closeEdit = () => {
        setClose(false)
        Animated.parallel([
            Animated.timing(editSize,{
                toValue:70,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(imgSize,{
                toValue:50,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(interpolatecolor,{
                toValue:0,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(editWidth,{
                toValue:0,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(editHeight,{
                toValue:0,
                duration:400,
                useNativeDriver:false
            })
        ]).start()
    }

    openEdit = () => {
        if(close) closeEdit()
        else{
            setClose(true)
            Animated.parallel([
                Animated.timing(editSize,{
                    toValue:40,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(imgSize,{
                    toValue:25,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(interpolatecolor,{
                    toValue:150,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(editWidth,{
                    toValue:300,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(editHeight,{
                    toValue:100,
                    duration:400,
                    useNativeDriver:false
                })
            ]).start(()=>{
                setTimeout(()=>{
                    closeEdit()
                },20000)
            })
        }
    }

    useEffect(()=>{
        animateIt()
        // AsyncStorage.getItem('Email')
        // .then(res => {
        //     if(res == null) setAutoLogin(false)
        //     else setAutoLogin(true)
        // })
    })

    autoLoginHandler = () => {
        setAutoLogin(!autoLogin)
        if(autoLogin){
            try{
                fetch(`http://localhost:3000/account/${props.user.id}/reqpass`)
                .then(res => {return res.json()})
                .then(data => {
                    if(data.result == false){
                        alert(data.message)
                    }else{
                        AsyncStorage.setItem('Email',props.user.email)
                        AsyncStorage.setItem('Pass',data.message)
                    }
                })
                .catch(err => alert(err.message))
            }catch(err){
                alert(err)
            }
        }else{
            AsyncStorage.removeItem('Email')
            AsyncStorage.removeItem('Pass')
        }
    }

    openPasswordChange = () => {
        Animated.parallel([
            Animated.timing(accountPageOpacity,{
                toValue:0,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(passChangeOpacity,{
                toValue:1,
                duration:600,
                useNativeDriver:false
            }),
            Animated.timing(passChangeHeight,{
                toValue:550,
                duration:600,
                useNativeDriver:false
            })
        ]).start()
    }

    closePasswordChange = () => {
        Animated.parallel([
            Animated.timing(accountPageOpacity,{
                toValue:1,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(passChangeOpacity,{
                toValue:0,
                duration:600,
                useNativeDriver:false
            }),
            Animated.timing(passChangeHeight,{
                toValue:0,
                duration:600,
                useNativeDriver:false
            })
        ]).start()
    }

    openAccountEdit = () => {
        Animated.parallel([
            Animated.timing(accountPageOpacity,{
                toValue:0,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(editAccountOpacity,{
                toValue:1,
                duration:600,
                useNativeDriver:false
            }),
            Animated.timing(editAccountHeight,{
                toValue:550,
                duration:600,
                useNativeDriver:false
            })
        ]).start()
    }

    closeAccountEdit = () => {
        Animated.parallel([
            Animated.timing(accountPageOpacity,{
                toValue:1,
                duration:400,
                useNativeDriver:false
            }),
            Animated.timing(editAccountOpacity,{
                toValue:0,
                duration:600,
                useNativeDriver:false
            }),
            Animated.timing(editAccountHeight,{
                toValue:0,
                duration:600,
                useNativeDriver:false
            })
        ]).start()
    }

    return(
        <View style={{height:'100%',width:'100%'}}>
            <TouchableOpacity onPress={()=>props.close()} style={{zIndex:100,height:'10%',width:'10%',position:'absolute',right:0}}><Image style={{height:'60%',width:'60%'}} source={require('../../settingsIcons/close.png')}/></TouchableOpacity>
            <Animated.View style={{opacity:passChangeOpacity,height:passChangeHeight}}>
                <TouchableOpacity onPress={()=>closePasswordChange()} activeOpacity={1} style={{flexDirection:'row',width:'100%',alignItems:'center',marginHorizontal:'3%'}}>
                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/back.png')}/>
                    <Text style={{color:'#00BFFF',fontSize:15}}>Account</Text>
                </TouchableOpacity>
                <Passwordchange />
            </Animated.View>
            <Animated.View style={{opacity:editAccountOpacity,height:editAccountHeight}}>
                <TouchableOpacity onPress={()=>closeAccountEdit()} activeOpacity={1} style={{flexDirection:'row',width:'100%',alignItems:'center',marginHorizontal:'3%'}}>
                    <Image style={{height:20,width:20}} source={require('../../settingsIcons/back.png')}/>
                    <Text style={{color:'#00BFFF',fontSize:15}}>Account</Text>
                </TouchableOpacity>
                <Editaccount user={props.user}/>
            </Animated.View>
            <Animated.View style={{height:'100%',width:'100%',opacity:accountPageOpacity}}>
                <View style={{height:'30%',width:'100%',alignItems:'center',justifyContent:'center'}}>
                    <Animated.View style={{opacity:hide,height:size,width:size,borderRadius:100,justifyContent:'center',alignItems:'center'}}>
                        <LinearGradient
                            colors={['#6fc4f9', '#87cefa', '#b8e2fc' ]}
                        style={{height:'100%',width:'100%',borderRadius:100,justifyContent:'center',alignItems:'center'}}>
                    </LinearGradient>
                </Animated.View>
                <View style={Style.ImageBox}>
                    {props.user.photo != '' ? <Image source={{ uri: props.user.photo }} /> : <Uimage name={user.name} />}
                </View>
            </View>
            <View style={{marginHorizontal:'10%'}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Shimmer>
                        <Text style={{fontSize:25,color:'white',fontWeight:'bold'}}>{props.user.name}</Text>
                    </Shimmer>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:15,color:'white'}}>{props.user.email}</Text>
                </View>
                {props.user.phone != '' ? <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white'}}>{props.user.phone}</Text>
                </View> : null}
                <View style={{flexDirection:'row',alignItems:'center',borderRadius:10,borderWidth:0.3,height:'20%',paddingHorizontal:'5%',marginTop:'5%'}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Member</Text>
                    <TouchableOpacity style={{borderWidth:0.5,height:'60%',marginHorizontal:'1.5%'}}/>
                    {props.user.member_type == 'Premium' || props.user.member_type == 'Temp' ? <Text style={{fontSize:18}}>Premium</Text> 
                    : <View><Text>Basic</Text><Text style={{right:0}}>Upgrade</Text></View>}
                </View>
                <View style={{width:'100%',height:'15%',marginTop:'3%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold',color:'white'}}>Auto-Login</Text>
                    <Switch trackColor={{ true: "#0F2027", false: "#00BFFF" }}
                        thumbColor={!autoLogin ? "#00BFFF" : "#00BFFF"} onValueChange={()=>autoLoginHandler()} value={autoLogin} style={{marginHorizontal:'3%'}}/>
                </View>
            </View>
            <View style={{width:'100%',position:'absolute',bottom:0,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity></TouchableOpacity>
                <TouchableOpacity></TouchableOpacity>
            </View>
            <View style={{width:'100%',position:'absolute',bottom:0,justifyContent:'center',alignItems:'center'}}>
                <Animated.View style={{width:editWidth,height:editHeight,position:'absolute',borderRadius:50,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>openAccountEdit()} style={{width:'50%',height:'40%',justifyContent:'center',alignItems:'center',borderRadius:50,backgroundColor:'#00BFFF'}}>
                        <Text style={{color:'white'}}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>openPasswordChange()} style={{width:'50%',height:'40%',justifyContent:'center',alignItems:'center',borderRadius:50,backgroundColor:'#00BFFF'}}>
                        <Text style={{color:'white'}}>Password</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{height:editSize,width:editSize}}>
                    <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center', alignItems:'center'}} onPress={()=>openEdit()}>
                        <Animated.View style={{height:imgSize,width:imgSize,borderRadius:50,backgroundColor:interpolateColor,justifyContent:'center',alignItems:'center'}}>
                            {close ? <Image style={{height:'60%',width:'60%'}} source={require('../../settingsIcons/close.png')}/> : <Image style={{height:'60%',width:'60%'}} source={require('../../settingsIcons/edit.png')}/>}
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            </Animated.View>
        </View>
    )
}

const Style = StyleSheet.create({
    ImageBox: {
        width: 95,
        height: 95,
        borderRadius: 100,
        position:'absolute',
        backgroundColor:'#2C5364',
        shadowColor: "#00BFFF",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    }
})