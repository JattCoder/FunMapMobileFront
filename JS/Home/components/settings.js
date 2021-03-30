import React,{ useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet, Dimensions, ScrollView, Switch, Text, Image, Animated, TouchableOpacity } from 'react-native'
import BackgroundColor from './backgroundColor'
import Account from '../../Components/settings/account'
import firebase from 'firebase'
import auth from '@react-native-firebase/auth'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export default Settings = (props) => {

    const [drivingMode,setDrivingMode] = useState(false)
    const drivingSwitch = () => setDrivingMode(previousState => !previousState)
    const [avoidHighways,setAvoidHighways] = useState(false)
    const highwaySwitch = () => setAvoidHighways(previousState => !previousState)
    const [avoidTolls,setAvoidTolls] = useState(false)
    const tollsSwitch = () => setAvoidTolls(previousState => !previousState)
    const [avoidFerries,setAvoidFerries] = useState(false)
    const ferriesSwitch = () => setAvoidFerries(previousState => !previousState)
    const [temperature,setTemperature] = useState(false)
    const temperatureSwitch = () => setTemperature(previousState => !previousState)
    const [settingsHeight] = useState(new Animated.Value(Dimensions.get('screen').height/1.85))
    const [settingsOpacity] = useState(new Animated.Value(1))
    const [accountHeight] = useState(new Animated.Value(0))
    const [accountOpacity] = useState(new Animated.Value(0))
    const [backgroundColorHeight] = useState(new Animated.Value(0))
    const [backgroundColorOpacity] = useState(new Animated.Value(0))
    const [saveExitOpacity] = useState(new Animated.Value(0))
    const [saveExitSize] = useState(new Animated.Value(0)) 

    // {"backgroundColor": "", "drivingMode": "driving", "familySelection": 0, "ferries": false, 
    // "highways": false, "id": 1, "permitted": "Ghost", "temperature": "F°", "tolls": false, "user_id": 1}

    saveAndExit = () => {
        props.user.id ? firebase.database().ref('Users/'+props.user.id+'/settings').update({
            drivingMode: drivingMode == false ? 'driving' : 'walking',
            highways: avoidHighways,
            tolls: avoidTolls,
            ferries: avoidFerries,
            temperature: temperature == false ? 'C°' : 'F°',
        }).then(res => {
            Animated.parallel([
                Animated.timing(saveExitSize,{
                    toValue: 0,
                    duration:10,
                    useNativeDriver:false
                }),
                Animated.timing(saveExitOpacity,{
                    toValue:0,
                    duration:10,
                    useNativeDriver:false
                })
            ]).start(()=>props.close())
        })
        .catch(err => console.warn(err)) : null
    }

    openBackgroundColor = () => {
        Animated.parallel([
            Animated.timing(settingsHeight,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(settingsOpacity,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(backgroundColorHeight,{
                toValue:Dimensions.get('screen').height/1.85,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(backgroundColorOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            })
        ]).start()
    }

    openAccount = () => {
        Animated.parallel([
            Animated.timing(settingsHeight,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(settingsOpacity,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(accountHeight,{
                toValue:Dimensions.get('screen').height/1.85,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(accountOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            })
        ]).start()
    }

    closeAccount = () => {
        Animated.parallel([
            Animated.timing(settingsHeight,{
                toValue:Dimensions.get('screen').height/1.85,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(settingsOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(accountHeight,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(accountOpacity,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            })
        ]).start()
    }

    useEffect(()=>{
        if(props.user.email) firebase.database().ref('Users/'+props.user.email.replace(punctuation,'').replace(spaceRE,'')).once('value',snapShot=>{
            if(drivingMode != (snapShot.child('drivingMode').val() == 'driving' ? false : true)){
                    setDrivingMode(previousState => !previousState)
                }
                if(avoidHighways != snapShot.child('highways').val()){
                    setAvoidHighways(previousState => !previousState)
                }
                if(avoidTolls != snapShot.child('tolls').val()){
                    setAvoidTolls(previousState => !previousState)
                }
                if(avoidFerries != snapShot.child('ferries').val()){
                    setAvoidFerries(previousState => !previousState)
                }
                if(temperature != (snapShot.child('weather').val() == 'F°' ? true : false)){
                    setTemperature(previousState => !previousState)
                }
        })
    },[props.user.email])

    closeScroll = (e) => {
        if(e.nativeEvent.contentOffset.y < -10){
            saveAndExit()
        }
    }

    return(
        <View style={Styles.Page}>
            <Animated.View style={{opacity:settingsOpacity,height:settingsHeight}}>
                <ScrollView onScroll={(e)=>closeScroll(e)} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{marginTop:'5%'}}>
                    <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:30,marginRight:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'#000C40'}}>Navigation</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:230,marginLeft:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.5,justifyContent:'center',alignItems:'center'}}>
                        <View style={Styles.Tab}>
                            <View style={{position:'absolute',left:25,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Image style={{height:30,width:30}} source={require('../../settingsIcons/mode.png')}/>
                                {drivingMode == false ? <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>   Driving</Text>
                                : <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>   Walking</Text>}
                            </View>
                            <Switch trackColor={{ false: "#fed8b1", true: "#FF8C00" }}
                                thumbColor={drivingMode ? "white" : "#FF8C00"}
                                onValueChange={drivingSwitch}
                                value={drivingMode} style={{position:'absolute',right:25}}/>
                        </View>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        <View style={Styles.Tab}>
                            <View style={{position:'absolute',left:25,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Image style={{height:30,width:30}} source={require('../../settingsIcons/highway.png')}/>
                                <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>   Highways</Text>
                            </View>
                            <Switch trackColor={{ false: "#767577", true: "#40E0D0" }}
                                thumbColor={avoidHighways ? "white" : "#40E0D0"}
                                onValueChange={highwaySwitch}
                                value={avoidHighways} style={{position:'absolute',right:25}}/>
                        </View>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        <View style={Styles.Tab}>
                            <View style={{position:'absolute',left:25,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Image style={{height:30,width:30}} source={require('../../settingsIcons/toll.png')}/>
                                <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>   Tolls</Text>
                            </View>
                            <Switch trackColor={{ false: "#767577", true: "#FF0080" }}
                                thumbColor={avoidTolls ? "white" : "#FF0080"}
                                onValueChange={tollsSwitch}
                                value={avoidTolls} style={{position:'absolute',right:25}}/>
                        </View>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        <View style={Styles.Tab}>
                            <View style={{position:'absolute',left:25,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Image style={{height:30,width:30}} source={require('../../settingsIcons/ferries.png')}/>
                                <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>   Ferries</Text>
                            </View>
                            <Switch trackColor={{ false: "#767577", true: "#c06c84" }}
                                thumbColor={avoidFerries ? "white" : "#c06c84"}
                                onValueChange={ferriesSwitch}
                                value={avoidFerries} style={{position:'absolute',right:25}}/>
                        </View>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:30,marginRight:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'#000C40'}}>Guidance</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:230,marginLeft:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        <View style={[Styles.Tab,{justifyContent:'center',alignItems:'center'}]}>
                            <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>Voice Guidance</Text>
                        </View>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:37,marginRight:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'#000C40'}}>Weather</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:237,marginLeft:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        <View style={Styles.Tab}>
                            <View style={{position:'absolute',left:25,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Image style={{height:30,width:30}} source={require('../../settingsIcons/temp.png')}/>
                                {temperature == true ? <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>   {'F°'}</Text>
                                : <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>   {'C°'}</Text>}
                            </View>
                            <Switch trackColor={{ false: "#767577", true: "#38ef7d" }}
                                thumbColor={temperature ? "white" : "#38ef7d"}
                                onValueChange={temperatureSwitch}
                                value={temperature} style={{position:'absolute',right:25}}/>
                        </View>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:'100%',marginRight:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'#000C40'}}>Account</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:240,marginLeft:10,borderWidth:0.5,borderColor:'#7F7FD5'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>openAccount()} style={{width:Dimensions.get('screen').width/1.25,height:'96%',justifyContent:'center',alignItems:'center',borderRadius:10,backgroundColor:'white'}}>
                            <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>Account Settings</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%',marginBottom:'7%'}}>
                        <View style={[Styles.Logout,{justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>auth().signOut().then(()=>props.logout.navigate('Login'))}>
                                <Text style={{fontweight:'bold',fontSize:16,color:'white'}}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
            <Animated.View style={{opacity:accountOpacity,height:accountHeight}}>
                <Account user={props.user} close={()=>closeAccount()}/>
            </Animated.View>
            <Animated.View style={{opacity:backgroundColorOpacity,height:backgroundColorHeight}}>
                <BackgroundColor />
            </Animated.View>
        </View>
    )
}

const Styles = StyleSheet.create({
    Page:{
        height:Dimensions.get('screen').height/1.9,
        width:'100%',
        top:0,
        right:0,
        left:0,
        bottom:0
    },
    Tab:{
        width:'80%',
        height:'95%',
        backgroundColor:'white',
        borderRadius:10,
        alignItems:'center',
        shadowColor: "white",
        flexDirection:'row',
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    ASettings:{
        height:'95%',
        width:'130%',
        backgroundColor:'white',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "white",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    Logout:{
        height:'100%',
        width:'80%',
        backgroundColor:'red',
        borderRadius:10,
        alignItems:'center',
        shadowColor: "red",
        flexDirection:'row',
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    }
})