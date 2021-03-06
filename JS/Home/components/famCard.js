import React,{ useState, useEffect } from 'react'
import UserCard from './userCard'
import SearchUser from './searchUser'
import GetTogether from './getTogether'
import { useDispatch } from 'react-redux'
import GroupSettings from './groupSettings'
import Meetnow from './meetnow'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Animated } from 'react-native'

export default FamCard = (props) => {
    const[famHeight] = useState(new Animated.Value(Dimensions.get('screen').height/1.97))
    const[famOpacity] = useState(new Animated.Value(1))
    const[rightButtonMarginTop] = useState(new Animated.Value(0))
    const[leftButtonMarginTop] = useState(new Animated.Value(0))
    const[usersOpacity] = useState(new Animated.Value(1))
    const[usersHeight] = useState(new Animated.Value(1))
    const[getTogetherOpacity] = useState(new Animated.Value(0))
    const[getTogetherHeight] = useState(new Animated.Value(0))
    const[getTogetherSize] = useState(new Animated.Value(30))
    const[getTogetherColor] = useState(new Animated.Value(0))
    const[getTogetherDisplay,setGetTogetherDisplay] = useState('none')
    const[gsettingsOpacity] = useState(new Animated.Value(0))
    const[gsettingsHeight] = useState(new Animated.Value(0))
    const[gsettingsSize] = useState(new Animated.Value(30))
    const[settingsColor] = useState(new Animated.Value(0))
    const[settingsDisplay,setSettingsDisplay] = useState('none')
    const[searchHeight] = useState(new Animated.Value(0))
    const[searchOpacity] = useState(new Animated.Value(0))
    const[searchSize] = useState(new Animated.Value(30))
    const[searchColor] = useState(new Animated.Value(0))
    const[searchDisplay,setSearchDisplay] = useState('none')
    const[nowHeight] = useState(new Animated.Value(0))
    const[nowOpacity] = useState(new Animated.Value(0))
    const[nowSize] = useState(new Animated.Value(30))
    const[nowColor] = useState(new Animated.Value(0))
    const[nowDisplay,setNowDisplay] = useState('none')
    const[members,setMembers] = useState([])
    const dispatch = useDispatch()

    openSearch = () => {
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
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(settingsColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchSize,{
                toValue:40,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchColor,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),,
            Animated.timing(nowSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setGetTogetherDisplay('none'),setSettingsDisplay('none'),setSearchDisplay(''),setNowDisplay('none'))
    }

    closeSearch = () => {
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
            Animated.timing(searchHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setSearchDisplay('none'))
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
            }),
            Animated.timing(getTogetherSize,{
                toValue:40,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherColor,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(settingsColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setGetTogetherDisplay(''),setSettingsDisplay('none'),setSearchDisplay('none'),setNowDisplay('none'))
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
            }),
            Animated.timing(getTogetherSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setGetTogetherDisplay('none'))
    }

    openNow = () => {
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
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(settingsColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowSize,{
                toValue:40,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowColor,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setGetTogetherDisplay('none'),setSettingsDisplay('none'),setSearchDisplay('none'),setNowDisplay(''))
    }

    closeNow = () => {
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
            }),
            Animated.timing(getTogetherSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setNowDisplay('none'))
    }

    openGSettings = () => {
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
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(getTogetherColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsOpacity,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsHeight,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsSize,{
                toValue:40,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(settingsColor,{
                toValue:1,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(searchColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(nowOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setGetTogetherDisplay('none'),setSettingsDisplay(''),setSearchDisplay('none'),setNowDisplay('none'))
    }

    closeGSettings = () => {
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
            Animated.timing(gsettingsOpacity,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsHeight,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(gsettingsSize,{
                toValue:30,
                duration:250,
                useNativeDriver:false
            }),
            Animated.timing(settingsColor,{
                toValue:0,
                duration:250,
                useNativeDriver:false
            }),
        ]).start(()=>setSettingsDisplay('none'))
    }

    useEffect(()=>{
        setTimeout(()=>{if(props.Users) setMembers(props.Users)},1000)
    },[props.Users])

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

    const settingsHeightInterpolate = gsettingsHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','75%']
    })

    const searchHeightInterpolate = searchHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','75%']
    })

    const nowHeightInterpolate = nowHeight.interpolate({
        inputRange:[0,1],
        outputRange:['0%','75%']
    })

    const getTogetherColorOpacity = getTogetherColor.interpolate({
        inputRange:[0,1],
        outputRange:['rgba(0,0,0,0)','#3b5998']
    })

    const gsettingsColorOpacity = settingsColor.interpolate({
        inputRange:[0,1],
        outputRange:['rgba(0,0,0,0)','#ff6f69']
    })

    const searchColorOpacity = searchColor.interpolate({
        inputRange:[0,1],
        outputRange:['rgba(0,0,0,0)','#ffcc5c']
    })

    const nowColorOpacity = nowColor.interpolate({
        inputRange:[0,1],
        outputRange:['rgba(0,0,0,0)','#88d8b0']
    })

    return(
        <View style={{width:Dimensions.get('window').width,height:'100%',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
            <Animated.View style={{opacity:famOpacity,width:Dimensions.get('screen').width/1.07,height:famHeight,shadowColor: "#000",shadowOffset: { width: 0,height: 4 },shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,backgroundColor:'rgba(0,0,0,0.1)',borderRadius:10,alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    {props.size > 1 ? <Animated.View style={{marginTop:leftButtonInterpolate,marginHorizontal:'4%',height:13,width:13}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{props.prev()}} style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}/>
                    </Animated.View> : null}
                    <View style={{marginTop:'3%',borderRadius:10,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{margin:5,fontSize:20,justifyContent:'center',color:'white'}}>{props.Name}</Text>
                    </View>
                    {props.size > 1 ? <Animated.View style={{marginTop:RightButtonInterpolate,marginHorizontal:'4%',height:13,width:13}}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{props.next()}} style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:50,width:'170%',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}/>
                    </Animated.View> : null}
                </View>
                <View style={{width:'100%',height:'7%',justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:'2%'}}>
                    <Animated.View style={{height:searchSize,width:searchSize,backgroundColor:searchColorOpacity,borderRadius:50}}>
                        <TouchableOpacity onPress={()=>searchDisplay == '' ? closeSearch() : openSearch()} style={{alignItems:'center',borderWidth:1,borderRadius:50,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            <Image style={{width:20,height:20}} source={require('../../settingsIcons/plus.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{height:gsettingsSize,width:gsettingsSize,backgroundColor:gsettingsColorOpacity,borderRadius:50,marginLeft:'2%'}}>
                        <TouchableOpacity onPress={()=>settingsDisplay == '' ? closeGSettings() : openGSettings()} style={{alignItems:'center',borderWidth:1,borderRadius:50,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            <Image style={{width:20,height:20}} source={require('../../settingsIcons/setting.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{height:getTogetherSize,width:getTogetherSize,backgroundColor:getTogetherColorOpacity,borderRadius:50,marginLeft:'2%'}}>
                        <TouchableOpacity onPress={()=>getTogetherDisplay == '' ? closeGetTopethers() : openGetTopethers()} style={{alignItems:'center',borderWidth:1,borderRadius:50,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            <Image style={{width:20,height:20}} source={require('../../settingsIcons/mail.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={{height:nowSize,width:nowSize,backgroundColor:nowColorOpacity,borderRadius:50,marginLeft:'2%'}}>
                        <TouchableOpacity onPress={()=>nowDisplay == '' ? closeNow() : openNow()} style={{alignItems:'center',borderWidth:1,borderRadius:50,borderColor:'#7F7FD5',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            <Image style={{width:20,height:20}} source={require('../../settingsIcons/now.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <Animated.View style={{height:getTogetherHeightInterpolate,width:'100%',margin:20,opacity:getTogetherOpacity,display:getTogetherDisplay}}>
                    <GetTogether id={props.ID} gettogether={props.gettogether} name={props.UserName} email={props.UserEmail} close={()=>closeGetTopethers()}/>
                </Animated.View>
                <Animated.View style={{height:settingsHeightInterpolate,width:'100%',margin:20,opacity:gsettingsOpacity,display:settingsDisplay}}>
                    <GroupSettings />
                </Animated.View>
                <Animated.View style={{height:searchHeightInterpolate,width:'100%',margin:20,opacity:searchOpacity,display:searchDisplay}}>
                    <SearchUser myId={props.UserId} groupId={props.ID} groupName={props.Name} senderName={props.UserName} senderEmail={props.UserEmail} members={members.map(member=>{return member.id})}/>
                </Animated.View>
                <Animated.View style={{height:nowHeightInterpolate,width:'100%',margin:20,opacity:nowOpacity,display:nowDisplay}}>
                    <Meetnow myId={props.UserId} groupId={props.ID} groupName={props.Name} senderName={props.UserName} senderEmail={props.UserEmail} members={members.map(member=>{return member.id})}/>
                </Animated.View>
                <Animated.View style={{height:usersHeightInterpolate,width:'100%',margin:20,opacity:usersOpacity}}>
                    <ScrollView >
                        {members.map((member)=>{
                            return <UserCard id={props.ID} user={member}/>
                        })}
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </View>
    )
}