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

    setCurrentFam = () => {
        dispatch(currentfamily(props.fam[1]))
    }

    useEffect(()=>{
        setCurrentFam()
    },[props.fam])

    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center'}}>
            <Animated.View style={{opacity:famOpacity,width:Dimensions.get('screen').width/1.07,height:famHeight,shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(0,0,0,0.4)',borderRadius:10,alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View style={{marginTop:'3%',marginHorizontal:'4%'}}><TouchableOpacity onPress={()=>{props.prev()}} style={{backgroundColor:'#00B4DB',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:13,height:13}}></TouchableOpacity></View>
                    <View style={{marginTop:'3%',borderRadius:10,backgroundColor:'#00B4DB',justifyContent:'center',alignItems:'center'}}><Text style={{margin:5,fontSize:20,justifyContent:'center',color:'white'}}>{props.fam[0].name}</Text></View>
                    <View style={{marginTop:'3%',marginHorizontal:'4%'}}><TouchableOpacity onPress={()=>{props.next()}} style={{backgroundColor:'#00B4DB',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:13,height:13}}></TouchableOpacity></View>
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
                        {props.fam[1].map((user,index)=>{
                            return <UserCard user={user} famid={props.fam[0].id} key={index}/>
                        })}
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
                <SearchUser groupId={props.fam[0].id} groupName={props.fam[0].name} groupCode={props.fam[0].code}/>
            </Animated.View>
        </View>
    )
}