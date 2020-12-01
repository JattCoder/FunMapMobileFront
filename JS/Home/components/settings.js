import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { settingsupdate } from '../../../actions/settings/settingupdate' 
import { View, StyleSheet, Dimensions, ScrollView, Switch, Text, Image, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackgroundColor from './backgroundColor'
import Account from '../../Components/settings/account'

export default Settings = (props) => {

    const [user,setUser] = useState(-1)
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
    const [added,setAdded] = useState(false)
    const dispatch = useDispatch()
    const [settingsHeight] = useState(new Animated.Value(Dimensions.get('screen').height/1.85))
    const [settingsOpacity] = useState(new Animated.Value(1))
    const [accountHeight] = useState(new Animated.Value(0))
    const [accountOpacity] = useState(new Animated.Value(0))
    const [backgroundColorHeight] = useState(new Animated.Value(0))
    const [backgroundColorOpacity] = useState(new Animated.Value(0))

    // {"backgroundColor": "", "drivingMode": "driving", "familySelection": 0, "ferries": false, 
    // "highways": false, "id": 1, "permitted": "Ghost", "temperature": "F°", "tolls": false, "user_id": 1}

    saveAndExit = () => {
        props.close()
        dispatch(settingsupdate({
            drivingMode: drivingMode == false ? 'driving' : 'walking',
            highways: avoidHighways,
            tolls: avoidTolls,
            ferries: avoidFerries,
            temperature: temperature == false ? 'C°' : 'F°',
        },user.id))
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

    useSelector((state)=>{
        if(added == false){
            set = state.settings
            setUser(state.login.message)
            if(drivingMode != (set.drivingMode == 'driving' ? false : true)){
                setDrivingMode(previousState => !previousState)
            }
            if(avoidHighways != set.avoidHighways){
                setAvoidHighways(previousState => !previousState)
            }
            if(avoidTolls != set.avoidTolls){
                setAvoidTolls(previousState => !previousState)
            }
            if(avoidFerries != set.avoidFerries){
                setAvoidFerries(previousState => !previousState)
            }
            if(temperature != (set.temperature == 'F°' ? true : false)){
                setTemperature(previousState => !previousState)
            }
            setAdded(true)
        }
    })

    return(
        <View style={Styles.Page}>
            <Animated.View style={{opacity:settingsOpacity,height:settingsHeight}}>
                <TouchableOpacity onPress={()=>saveAndExit()} style={{width:'100%',height:'4%'}}>
                    <View style={{justifyContent:'center',position:'absolute',alignItems:'center',flexDirection:'row'}}>
                        <Image style={{height:20,width:20}} source={require('../../settingsIcons/back.png')}/>
                        <Text style={{color:'white',fontSize:20}}>Family</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{marginTop:'5%'}}>
                    <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:30,marginRight:10,borderWidth:0.5,borderColor:'white'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'white'}}>Navigation</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:230,marginLeft:10,borderWidth:0.5,borderColor:'white'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center'}}>
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
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:30,marginRight:10,borderWidth:0.5,borderColor:'white'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'white'}}>Guidance</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:230,marginLeft:10,borderWidth:0.5,borderColor:'white'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        <View style={[Styles.Tab,{justifyContent:'center',alignItems:'center'}]}>
                            <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>Voice Guidance</Text>
                        </View>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:37,marginRight:10,borderWidth:0.5,borderColor:'white'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'white'}}>Weather</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:237,marginLeft:10,borderWidth:0.5,borderColor:'white'}}/>
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
                    {/* <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:55,marginRight:10,borderWidth:0.5,borderColor:'white'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'white'}}>Style</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:255,marginLeft:10,borderWidth:0.5,borderColor:'white'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        <TouchableOpacity onPress={()=>openBackgroundColor()} style={[Styles.Tab,{justifyContent:'center',alignItems:'center'}]}>
                            <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>Background Color</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{width:Dimensions.get('screen').width,marginTop:'4%',alignItems:'center',justifyContent:'center',marginBottom:'2%',flexDirection:'row'}}>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:'100%',marginRight:10,borderWidth:0.5,borderColor:'white'}}/>
                        <Text style={{fontSize:20,fontweight:'bold',color:'white'}}>Account</Text>
                        <TouchableOpacity activeOpacity={1} style={{height:0,width:240,marginLeft:10,borderWidth:0.5,borderColor:'white'}}/>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>openAccount()} style={Styles.ASettings}>
                            <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>Account Settings</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%',marginBottom:'7%'}}>
                        <View style={[Styles.Logout,{justifyContent:'center',alignItems:'center'}]}>
                            <Text style={{fontweight:'bold',fontSize:16,color:'black'}}>Logout</Text>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
            <Animated.View style={{opacity:accountOpacity,height:accountHeight}}>
                <Account user={user} close={()=>closeAccount()}/>
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
    },ASettings:{
        height:'95%',
        width:'95%',
        backgroundColor:'white',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
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