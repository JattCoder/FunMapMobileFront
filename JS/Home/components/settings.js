import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, StyleSheet, Dimensions, ScrollView, Switch, Text } from 'react-native'

export default Settings = () => {
    return(
        <View style={Styles.Page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{width:Dimensions.get('screen').width,justifyContent:'center',alignItems:'center'}}><Text>Navigation</Text></View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center'}}>
                    <View style={Styles.Tab}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black',position:'absolute',left:25}}>Driving Mode</Text>
                        <Switch style={{position:'absolute',right:25}}/>
                    </View>
                </View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    <View style={Styles.Tab}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black',position:'absolute',left:25}}>Highways</Text>
                        <Switch style={{position:'absolute',right:25}}/>
                    </View>
                </View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    <View style={Styles.Tab}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black',position:'absolute',left:25}}>Tolls</Text>
                        <Switch style={{position:'absolute',right:25}}/>
                    </View>
                </View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    <View style={Styles.Tab}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black',position:'absolute',left:25}}>Ferries</Text>
                        <Switch style={{position:'absolute',right:25}}/>
                    </View>
                </View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    <View style={Styles.Tab}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black',position:'absolute',left:25}}>Temperature</Text>
                        <Switch style={{position:'absolute',right:25}}/>
                    </View>
                </View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    <View style={[Styles.Tab,{justifyContent:'center',alignItems:'center'}]}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black'}}>Background Color</Text>
                    </View>
                </View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    <View style={[Styles.Tab,{justifyContent:'center',alignItems:'center'}]}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black'}}>Account Settings</Text>
                    </View>
                </View>
                <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/15.2,justifyContent:'center',alignItems:'center',marginTop:'10%',marginBottom:'7%'}}>
                    <View style={[Styles.Logout,{justifyContent:'center',alignItems:'center'}]}>
                        <Text style={{fontweight:'bold',fontSize:25,color:'black'}}>Logout</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const Styles = StyleSheet.create({
    Page:{
        height:Dimensions.get('screen').height/1.9,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        top:0,
        right:0,
        left:0,
        bottom:0
    },
    Tab:{
        height:'100%',
        width:'80%',
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