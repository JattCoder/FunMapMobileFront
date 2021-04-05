import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import Locationshare from './components/locationshare'
import Bottomweather from '../Components/bottomweather/bottomweather'
import NewFamily from './components/newFamily'
import Families from './components/families'
import Uimage from './uimage'
import PlaceSearchResults from './components/placeSearchResults'
import LinearGradient from 'react-native-linear-gradient'
import Settings from './components/settings'
import { bottomsheet } from '../../actions/animation/bottomsheet'
import { clemarker } from '../../actions/marker/clemarker'
import Navigating from './components/navigating'
import { StyleSheet, Animated, View, ScrollView, TouchableOpacity, Image, Dimensions, Text } from 'react-native'
const { width, height } = Dimensions.get('screen')
let closeButtonsTimeout

export default Drawerr = (props) => {

  const [backColor,setBackColor] = useState(['#00B4DB','#1CB5E0','#000046'])
  const [action,setAction] = useState('')
  const [alignment] = useState(new Animated.Value(0))
  const [sheetHeight] = useState(new Animated.Value(height/7.4))
  const [headingMargin] = useState(new Animated.Value(40))
  const [bottomViewOpacity] = useState(new Animated.Value(0))
  const [bottomViewHeight] = useState(new Animated.Value(0))
  const [menuButtonSize] = useState(new Animated.Value(50))
  const [menuButtonColor] = useState(new Animated.Value(0))
  const [newGroupButtonOpacity] = useState(new Animated.Value(0))
  const [newGroupButtonSize] = useState(new Animated.Value(0))
  const [settingOpacity] = useState(new Animated.Value(0))
  const [settingSize] = useState(new Animated.Value(0))
  const [groupOpacity] = useState(new Animated.Value(1))
  const [groupHeight] = useState(new Animated.Value(Dimensions.get('window').height/1.7))
  const [newGroupFormOpacity] = useState(new Animated.Value(0))
  const [newGroupFormHeight] = useState(new Animated.Value(0))
  const [newGroupFormDisplay,setnewGroupFormDisplay] = useState('')
  const [searchResultsOpacity] = useState(new Animated.Value(0))
  const [searchResultsHeight] = useState(new Animated.Value(0))
  const [settingsHeight] = useState(new Animated.Value(Dimensions.get('screen').height/1.7))
  const [settingsWidth] = useState(new Animated.Value(Dimensions.get('screen').width))
  const [settingsOpacity] = useState(new Animated.Value(0))
  const [settingsDisplay,setSettingsDisplay] = useState('none')
  const [menuOpen,setMenuOpen] = useState(false)
  const [navigating,setNavigating] = useState(false)
  const [navigateOpacity] = useState(new Animated.Value(0))
  const [navigateHeight] = useState(new Animated.Value(1))
  const [addStop,setAddStop] = useState(false)
  const [sheetOpen,setSheetOpen] = useState(false) 
  const dispatch = useDispatch()

  slideSheet = (open) => {
    Animated.parallel([
      Animated.timing(alignment, {
        toValue:open?1:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(sheetHeight,{
        toValue:open?height/1.2:height/7.4,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(headingMargin,{
        toValue:open?-10:40,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewOpacity,{
        toValue:open?1:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewHeight,{
        toValue:open?Dimensions.get('window').height/1.4:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(searchResultsOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(searchResultsHeight,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      })
    ]).start()
  }

  actionButtons = (open) => {
    setMenuOpen(menuOpen ? false : true)
    Animated.parallel([
      Animated.timing(menuButtonSize,{
        toValue:open?25:50,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(settingSize,{
        toValue:open?50:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(settingOpacity,{
        toValue:open?1:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupButtonSize,{
        toValue:open?50:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupButtonOpacity,{
        toValue:open?1:0,
        duration:500,
        useNativeDriver:false
      })
    ]).start(()=>menuOpen ? setTimeout(()=>actionButtons(menuOpen ? false : true),15000) : null)
  }

  actionForm = (open) => {
    Animated.parallel([
      Animated.timing(groupOpacity,{
        toValue:open?0:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupHeight,{
        toValue:open?0:Dimensions.get('window').height/1.7,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupFormHeight,{
        toValue:open?Dimensions.get('window').height/1.7:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupFormOpacity,{
        toValue:open?1:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(settingsOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
    ]).start()
  }

  actionSettings = (open) => {
    setSettingsDisplay(open ? '' : 'none')
    Animated.parallel([
      Animated.timing(settingsOpacity,{
        toValue:open?1:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupHeight,{
        toValue:open?0:Dimensions.get('window').height/1.7,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupOpacity,{
        toValue:open?0:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupFormHeight,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupFormOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      })
    ]).start(()=>setSettingsDisplay(open ? '' : 'none'))
  }

  //STARTING HERE WITH NAVIGATION ACTIVE DIRECTION...

  navigatingActiveDirection = () => {
    Animated.parallel([
      Animated.timing(alignment,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }).start(),
      Animated.timing(sheetHeight,{
        toValue:height/4.4,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(headingMargin,{
        toValue:30,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewHeight,{
        toValue:0,
        duration:550,
        useNativeDriver:false
      }),
      Animated.timing(navigateOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(navigateHeight,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      })
    ]).start()
  }

  const actionSheetIntropolate = alignment.interpolate({
    inputRange: [0,1],
    outputRange: [-height/12.7+60, 0]
  })

  const actionSheetStyle = {
    bottom: actionSheetIntropolate
  }

  guestureHandler = (e) => {
    if(e > 0) slideSheet(true)
    else if(e < 0) slideSheet(false)
  }

  navigateClose = () => {
    hideTheActionSheet(),dispatch(bottomsheet('')),setMenuOpen(false)
  }

  searchSheet = () => {
    setSheetOpen(true)
    Animated.parallel([
      Animated.timing(alignment, {
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(sheetHeight,{
        toValue:height/2.4,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(headingMargin,{
        toValue:5,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(searchResultsOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(searchResultsHeight,{
        toValue:Dimensions.get('window').height/3.1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewHeight,{
        toValue:0,
        duration:550,
        useNativeDriver:false
      }),
    ]).start()
  }

  useSelector((state)=>{
    if(state.marker.placeid != '' && !sheetOpen) searchSheet()
  })

  return(
     <Animated.View style={[Styles.Bottom,actionSheetStyle,{height:sheetHeight}]}>
       <LinearGradient colors={['rgba(255,255,255,0.7)','white','white']} style={{height:'100%',width:'100%',alignItems:'center',borderTopLeftRadius:25,borderTopRightRadius:25,}}>
        {!navigating ? <ScrollView onScroll={(e)=>guestureHandler(e.nativeEvent.contentOffset.y)} style={{width:80,height:10,borderTopWidth:3,marginTop:10,borderColor:'white',zIndex:100}} /> : null}
        <Animated.View style={{width:Dimensions.get('screen').width,height:'20%',position:'absolute',flexDirection:'row',marginTop:headingMargin,marginHorizontal:'5%',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>props.followMe()} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:'5%',zIndex:150}}>
            <TouchableOpacity onPress={()=>props.followMe()} style={[Styles.ImageBox,{height:45,width:45}]}>
              {props.user.photo != '' ? <Image source={{ uri: props.user.image }} /> : <Uimage name={props.user.name} />}
            </TouchableOpacity>
            <View>
              {props.user.settings ? <Bottomweather id={props.user.id} name={props.user.name} email={props.user.email} temp={props.user.settings.temperature} position={props.position}/> : null}
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{height:bottomViewHeight,width:Dimensions.get('screen').width,opacity:bottomViewOpacity}}>
          <Locationshare id={props.user.id} share={props.user.locationShare}/>
          <Animated.View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/1.75}}>
            <Animated.View style={{height:groupHeight,width:'100%',opacity:groupOpacity,justifyContent:'center',alignItems:'center'}}>
              <Families user={props.user}/>
            </Animated.View>
            <Animated.View style={{width:settingsWidth,height:settingsHeight,opacity:settingsOpacity,justifyContent:'center',alignItems:'center',display:settingsDisplay}}>
              <Settings close={()=>actionSettings(false)} user={props.user} logout={props.logout}/>
            </Animated.View>
            <Animated.View style={{height:newGroupFormHeight,width:'100%',opacity:newGroupFormOpacity,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>actionForm(false)} style={{width:-Dimensions.get('screen').width,height:'8%',borderRadius:10,position:'absolute',top:20,right:25,zIndex:100,display:newGroupFormDisplay}}>
                  <Image style={{height:30,width:30}} source={require('../settingsIcons/close.png')}/>
              </TouchableOpacity>
              <NewFamily user={props.user} finish={()=>actionForm(false)}/>
            </Animated.View>
          </Animated.View>
          <Animated.View style={{position:'absolute',bottom:0,right:0,left:0,width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/9.3,justifyContent:'center'}}>
              <Animated.View style={{height:menuButtonSize,width:menuButtonSize,position:'absolute',right:20,justifyContent:'center',alignItems:'center',zIndex:100}}>
                <TouchableOpacity style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>actionButtons(menuOpen ? false : true)}>
                  {menuOpen ? <View style={{height:'100%',width:'100%',backgroundColor:'red',borderRadius:50,justifyContent:'center',alignItems:'center'}}><Image style={{height:20,width:20}} source={require('../settingsIcons/close.png')}/></View>
                  : <View style={{height:'100%',width:'100%',backgroundColor:'#7F7FD5',borderRadius:50,justifyContent:'center',alignItems:'center'}}><Image style={{height:20,width:20}} source={require('../settingsIcons/plus.png')}/></View>}
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{opacity:settingOpacity,height:settingSize,width:settingSize,borderRadius:50,position:'absolute',backgroundColor:'#f7797d',right:20*3,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>actionSettings(true)}>
                  <Image style={{height:20,width:20}} source={require('../settingsIcons/setting.png')}/>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{opacity:newGroupButtonOpacity,height:newGroupButtonSize,width:newGroupButtonSize,borderRadius:50,position:'absolute',backgroundColor:'#FBD786',right:20*6,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>actionForm(true)}>
                  <Image style={{height:20,width:20}} source={require('../settingsIcons/plus.png')}/>
                </TouchableOpacity>
              </Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={{height:searchResultsHeight,width:Dimensions.get('screen').width,opacity:searchResultsOpacity}}>
          <PlaceSearchResults position={props.position} user={props.user} hide={()=>navigateClose()} />
        </Animated.View>
      </LinearGradient>
     </Animated.View>
  )
}

const Styles = StyleSheet.create({
  Bottom:{
      width:width,
      alignItems:'center',
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      right:0,
      left:0,
      borderWidth:0.5,
      borderColor:'#f3ebe1',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24
  },
  ImageBox: {
      borderRadius: 50,
      borderColor: '#7F7FD5',
      borderWidth: 0.5,
      marginHorizontal:'3%'
  }
})