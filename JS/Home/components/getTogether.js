import React,{ useEffect, useState } from 'react'
import { ScrollView, Text, Animated, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default GetTogether = (props) => {

    const[pageHeight] = useState(new Animated.Value(0))
    const[newGetTogetherIndex] = useState(new Animated.Value(-1))
    const[newGetTogetherOpacity] = useState(new Animated.Value(0))

    const pageHeightInterpolate = pageHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','100%']
    })

    openNewForm = () => {
        Animated.parallel([
            Animated.timing(newGetTogetherIndex,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(newGetTogetherOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            })
        ]).start()
    }

    useEffect(()=>{
        Animated.timing(pageHeight,{
            toValue:1,
            duration:250,
            useNativeDriver:false
        }).start()
    },[props.gettogether])

    scrollIt = (scroll) => {
        if(scroll.nativeEvent.contentOffset.y < -5) props.close()
    }

    return(
        <Animated.View style={{height:pageHeightInterpolate,width:'100%',shadowColor: "#000",shadowColor: "#000",shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68,elevation: 11,}}>
            <View style={{width:'100%',height:'80%'}}>
                {props.gettogether ? <ScrollView showsVerticalScrollIndicator={false} fadingEdgeLength={10} onScroll={(r)=>scrollIt(r)} style={{height:'100%',width:'100%'}}>
                    {props.gettogether.map(gettogether => {
                        return <View style={{width:'100%',alignItems:'center',borderRadius:50}}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(211,204,227,0.1)']} style={{borderRadius:10,width:'90%',height:'130%',alignItems:'center',flexDirection:'row',borderWidth:1,borderColor:'#7F7FD5'}}>
                                <LinearGradient colors={['rgba(211,204,227,0.1)']} style={{borderRadius:10,width:'100%',height:'100%',alignItems:'center',flexDirection:'row'}}>
                                    <View style={{width:'80%',justifyContent:'center',borderRadius:10}}>
                                        <View style={{marginLeft:'5%'}}>
                                            <Text style={{color:'#7F7FD5',fontWeight:'bold',fontSize:15}}>{gettogether.Name}</Text>
                                            <Text style={{color:'#7F7FD5',fontSize:13}}>Host: {gettogether.HostName}</Text>
                                        </View>
                                    </View>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#7F7FD5',fontSize:13}}>{gettogether.Time}</Text>
                                    </View>
                                </LinearGradient>
                            </LinearGradient>
                        </View>
                    })}
                </ScrollView> : <Text>No Get Togethers</Text>}
            </View>
            <View style={{width:'100%',height:'20%',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>openNewForm()} style={{backgroundColor:'#7F7FD5',width:'40%',height:'70%',borderRadius:10,borderWidth:1.5,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',shadowColor: "rgba(211,204,227,0.1)",shadowOffset: {width: 0,height: 5,},shadowOpacity: 10.36,shadowRadius: 5.68,elevation: 11,}}>
                    <Text style={{color:'white',fontWeight:'bold'}}>Add New</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={{position:'absolute',height:'100%',width:'95%',backgroundColor:'rgba(0,0,0,0.6)',borderRadius:10,right:7,left:7,zIndex:newGetTogetherIndex,opacity:newGetTogetherOpacity,justifyContent:'center',alignItems:'center'}}>
                <Text>Hello</Text>
            </Animated.View>
        </Animated.View>
    )
}