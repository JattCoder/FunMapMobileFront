import React,{ useState, useEffect } from 'react'
import UserCard from './userCard'
import SearchUser from './searchUser'
import GetTogether from './getTogether'
import { useDispatch } from 'react-redux'
import { currentfamily } from '../../../actions/mapFamily/currentfamily'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Animated } from 'react-native'

export default FamCard = (props) => {

    const[fam,setFam] = useState({
        Name: 'Harmandeep Mand',
        Users: []
    })
    const[famHeight] = useState(new Animated.Value(Dimensions.get('screen').height/1.97))
    const[famOpacity] = useState(new Animated.Value(1))
    const[searchHeight] = useState(new Animated.Value(0))
    const[searchOpacity] = useState(new Animated.Value(0))
    const[rightButtonMarginTop] = useState(new Animated.Value(0))
    const[leftButtonMarginTop] = useState(new Animated.Value(0))
    const[usersOpacity] = useState(new Animated.Value(1))
    const[usersHeight] = useState(new Animated.Value(1))
    const[getTogetherOpacity] = useState(new Animated.Value(0))
    const[getTogetherHeight] = useState(new Animated.Value(0))
    const[getTogetherDisplay,setGetTogetherDisplay] = useState('none')
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

    openGetTopethers = () => {
        Animated.parallel([
            Animated.timing(usersHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(usersOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            })
        ]).start(()=>setGetTogetherDisplay(''))
    }

    closeGetTopethers = () => {
        Animated.parallel([
            Animated.timing(usersHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(usersOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            })
        ]).start(()=>setGetTogetherDisplay('none'))
    }

    const leftButtonInterpolate = leftButtonMarginTop.interpolate({
        inputRange:[0,1,2],
        outputRange:['3%','2.5%','2%']
    })

    const RightButtonInterpolate = rightButtonMarginTop.interpolate({
        inputRange:[0,1,2],
        outputRange:['3%','2.5%','2%']
    })

    const usersHeightInterpolate = usersHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','75%']
    })

    const getTogetherHeightInterpolate = getTogetherHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','75%']
    })

    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
            <Animated.View style={{opacity:famOpacity,width:Dimensions.get('screen').width/1.07,height:famHeight,shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(211,204,227,1)',borderRadius:10,alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    {props.size > 1 ? <Animated.View style={{marginTop:leftButtonInterpolate,marginHorizontal:'4%',height:13,width:13}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{props.prev()}} style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}/>
                    </Animated.View> : null}
                    <View style={{marginTop:'3%',borderRadius:10,backgroundColor:'#7F7FD5',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{margin:5,fontSize:20,justifyContent:'center',color:'white'}}>{props.Name}</Text>
                    </View>
                    {props.size > 1 ? <Animated.View style={{marginTop:RightButtonInterpolate,marginHorizontal:'4%',height:13,width:13}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{props.next()}} style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}/>
                    </Animated.View> : null}
                </View>
                <View style={{width:'100%',height:'7%',justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:'2%'}}>
                    <TouchableOpacity onPress={()=>openSearch()} style={{alignItems:'center',borderWidth:1,borderRadius:50,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',height:30,width:30}}>
                        <Image style={{width:20,height:20}} source={require('../../settingsIcons/plus.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('Settings')} style={{alignItems:'center',marginHorizontal:'2%',borderWidth:1,borderRadius:50,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',height:30,width:30}}>
                        <Image style={{width:20,height:20}} source={require('../../settingsIcons/setting.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>openGetTopethers()} style={{alignItems:'center',borderWidth:1,borderRadius:50,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',height:30,width:30}}>
                        <Image style={{width:20,height:20}} source={require('../../settingsIcons/mail.png')} />
                    </TouchableOpacity>
                </View>
                <Animated.View style={{height:getTogetherHeightInterpolate,width:'100%',margin:20,opacity:getTogetherOpacity,display:getTogetherDisplay}}>
                    <GetTogether gettogether={props.gettogether} close={()=>closeGetTopethers()}/>
                </Animated.View>
                <Animated.View style={{height:usersHeightInterpolate,width:'100%',margin:20,opacity:usersOpacity}}>
                    <ScrollView>
                        {props.Users.map((member)=>{
                            return <UserCard user={member} locShare={props.locShare}/>
                        })}
                    </ScrollView>
                </Animated.View>
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