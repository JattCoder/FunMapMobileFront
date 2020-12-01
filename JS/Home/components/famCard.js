import React,{ useState, useEffect } from 'react'
import UserCard from './userCard'
import SearchUser from './searchUser'
import { useDispatch } from 'react-redux'
import { currentfamily } from '../../../actions/mapFamily/currentfamily'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Animated } from 'react-native'

export default FamCard = (props) => {

    const[famHeight] = useState(new Animated.Value(Dimensions.get('screen').height/1.97))
    const[famOpacity] = useState(new Animated.Value(1))
    const[searchHeight] = useState(new Animated.Value(0))
    const[searchOpacity] = useState(new Animated.Value(0))
    const[rightButtonMarginTop] = useState(new Animated.Value(0))
    const[leftButtonMarginTop] = useState(new Animated.Value(0))
    const dispatch = useDispatch()

    openSearch = () => {
        Animated.parallel([
            Animated.timing(famHeight,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(famOpacity,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(searchHeight,{
                toValue:Dimensions.get('screen').height/1.85,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(searchOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            })
        ]).start()
    }

    closeSearch = () => {
        Animated.parallel([
            Animated.timing(famHeight,{
                toValue:Dimensions.get('screen').height/1.97,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(famOpacity,{
                toValue:1,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(searchHeight,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
            Animated.timing(searchOpacity,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            })
        ]).start()
    }

    const leftButtonInterpolate = leftButtonMarginTop.interpolate({
        inputRange:[0,1,2],
        outputRange:['3%','2.5%','2%']
    })

    const RightButtonInterpolate = rightButtonMarginTop.interpolate({
        inputRange:[0,1,2],
        outputRange:['3%','2.5%','2%']
    })

    useEffect(()=>{
        console.warn(props.fam)
    },[props.fam])

    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
            <Animated.View style={{opacity:famOpacity,width:Dimensions.get('screen').width/1.07,height:famHeight,shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(211,204,227,1)',borderRadius:10,alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Animated.View style={{marginTop:leftButtonInterpolate,marginHorizontal:'4%',height:13,width:13}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{props.prev()}} style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}/>
                    </Animated.View>
                    <View style={{marginTop:'3%',borderRadius:10,backgroundColor:'#7F7FD5',justifyContent:'center',alignItems:'center'}}>
                        {/* <Text style={{margin:5,fontSize:20,justifyContent:'center',color:'white'}}>{props.fam.Name}</Text> */}
                    </View>
                    <Animated.View style={{marginTop:RightButtonInterpolate,marginHorizontal:'4%',height:13,width:13}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{props.next()}} style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}/>
                    </Animated.View>
                </View>
                <View style={{width:'100%',height:'5%',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>openSearch()} style={{zIndex:500,flexDirection:'row',alignItems:'center',position:'absolute',left:15,top:0}}>
                        <Image style={{width:35,height:35}} source={require('../../settingsIcons/plus.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('Settings')} style={{flexDirection:'row',alignItems:'center',position:'absolute',right:15,top:0}}>
                        <Image style={{width:35,height:35}} source={require('../../settingsIcons/setting.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{height:'75%',width:'100%',margin:20}}>
                    <ScrollView>
                        {/* {props.fam.Users.map((member)=>{
                            return <UserCard user={member} />
                        })} */}
                    </ScrollView>
                </View>
            </Animated.View>
            <Animated.View style={{height:searchHeight,width:'100%',opacity:searchOpacity,alignItems:'center'}}>
                <View style={{width:Dimensions.get('screen').width/1.1}}>
                    <TouchableOpacity onPress={()=>closeSearch()} style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{height:20,width:20}} source={require('../../settingsIcons/back.png')}/>
                        <Text style={{fontSize:15,color:'#000046'}}>Family</Text>
                    </TouchableOpacity>
                </View>
                {/* <SearchUser groupId={props.fam[0].id} groupName={props.fam[0].name} groupCode={props.fam[0].code}/> */}
            </Animated.View>
        </View>
    )
}