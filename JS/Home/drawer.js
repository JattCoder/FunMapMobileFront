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
//<Bottom user={props.user} position={props.regionPosition}/>
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
  const dispatch = useDispatch()

  const bringUpActionSheet = () => {
    Animated.parallel([
      Animated.timing(alignment, {
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(sheetHeight,{
        toValue:height/1.2,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(headingMargin,{
        toValue:-10,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(bottomViewHeight,{
        toValue:Dimensions.get('window').height/1.4,
        duration:500,
        useNativeDriver:false
      })
    ]).start()
  }

  const hideTheActionSheet = () => {
    Animated.parallel([
      Animated.timing(alignment,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }).start(),
      Animated.timing(sheetHeight,{
        toValue:height/7.4,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(headingMargin,{
        toValue:40,
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

  const showButtons = () => {
    if(menuOpen) {
      if(closeButtonsTimeout) clearTimeout(closeButtonsTimeout)
      hideButtons()
    }
    else{
      setMenuOpen(true)
      Animated.parallel([
        Animated.timing(menuButtonSize,{
          toValue:25,
          duration:500,
          useNativeDriver:false
        }),
        Animated.timing(settingSize,{
          toValue:50,
          duration:500,
          useNativeDriver:false
        }),
        Animated.timing(settingOpacity,{
          toValue:1,
          duration:500,
          useNativeDriver:false
        }),
        Animated.timing(newGroupButtonSize,{
          toValue:50,
          duration:500,
          useNativeDriver:false
        }),
        Animated.timing(newGroupButtonOpacity,{
          toValue:1,
          duration:500,
          useNativeDriver:false
        })
      ]).start(()=>{
        closeButtonsTimeout = setTimeout(()=>{
          hideButtons()
        },30000)
      })
    }
  }

  const hideButtons = () => {
    setMenuOpen(false)
    Animated.parallel([
      Animated.timing(menuButtonSize,{
        toValue:50,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(settingSize,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(settingOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupButtonSize,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupButtonOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      })
    ]).start()
  }

  const openForm = () => {
    setnewGroupFormDisplay('')
    Animated.parallel([
      Animated.timing(groupOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupHeight,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupFormHeight,{
        toValue:Dimensions.get('window').height/1.7,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(newGroupFormOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(settingsOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
    ]).start(()=>setSettingsDisplay('none'))
  }

  const closeForm = () => {
    Animated.parallel([
      Animated.timing(groupOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupHeight,{
        toValue:Dimensions.get('window').height/1.7,
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
    ]).start(()=>setnewGroupFormDisplay('none'))
  }

  openSettings = () => {
    setSettingsDisplay('')
    Animated.parallel([
      Animated.timing(settingsOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupHeight,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupOpacity,{
        toValue:0,
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
    ]).start(()=>setnewGroupFormDisplay('none'))
  }

  closeSettings = () => {
    Animated.parallel([
      Animated.timing(settingsOpacity,{
        toValue:0,
        duration:100,
        useNativeDriver:false
      }),
      Animated.timing(groupHeight,{
        toValue:Dimensions.get('window').height/1.7,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(groupOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:false
      })
    ]).start(()=>setSettingsDisplay('none'))
  }

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
      Animated.timing(searchResultsOpacity,{
        toValue:0,
        duration:500,
        useNativeDriver:false
      }),
      Animated.timing(searchResultsHeight,{
        toValue:0,
        duration:500,
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

  navigatingAddStop = () => {
    console.warn('Lets add stop')
  }

  const actionSheetIntropolate = alignment.interpolate({
    inputRange: [0,1],
    outputRange: [-height/12.7+60, 0]
  })

  const navigateHeightInterpolate = navigateHeight.interpolate({
    inputRange: [0,1],
    outputRange: ['0%','56%']
  })

  const actionSheetStyle = {
    bottom: actionSheetIntropolate
  }

  guestureHandler = (e) => {
    if(e > 0) navigating ? navigatingAddStop() : bringUpActionSheet()
    else if(e < 0) navigating ? navigatingActiveDirection() : hideTheActionSheet(),dispatch(bottomsheet('')),dispatch(clemarker()),setMenuOpen(false)
  }

  navigateClose = () => {
    hideTheActionSheet(),dispatch(bottomsheet('')),setMenuOpen(false)
  }

  useSelector((state)=>{
    if(state.navigation.active){
      navigating != state.navigation.active ? setNavigating(state.navigation.active) : null
      navigatingActiveDirection()
    }
    else if(state.sheet == 'Search'){
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
    }else if(state.sheet == '') hideTheActionSheet()
  })

  return(
     <Animated.View style={[Styles.Bottom,actionSheetStyle,{height:sheetHeight}]}>
       <LinearGradient colors={['rgba(211,204,227,0.1)','rgba(211,204,227,0.7)','#D3CCE3','#D3CCE3','#D3CCE3','#E9E4F0','#E9E4F0']} style={{height:'100%',width:'100%',alignItems:'center',borderTopLeftRadius:25,borderTopRightRadius:25,}}>
        <ScrollView onScroll={(e)=>guestureHandler(e.nativeEvent.contentOffset.y)} style={{width:80,height:10,borderTopWidth:3,marginTop:10,borderColor:'white',zIndex:100}} />
        <Animated.View style={{width:Dimensions.get('screen').width,height:'20%',position:'absolute',flexDirection:'row',marginTop:headingMargin,marginHorizontal:'5%',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>props.followMe()} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:'5%',zIndex:150}}>
            <TouchableOpacity onPress={()=>props.followMe()} style={[Styles.ImageBox,{height:45,width:45}]}>
              {props.user.photo != '' ? <Image source={{ uri: props.user.image }} /> : <Uimage name={props.user.name} />}
            </TouchableOpacity>
            <View> 
              <Bottomweather name={props.user.name} email={props.user.email} position={props.regionPosition}/>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{height:bottomViewHeight,width:Dimensions.get('screen').width,opacity:bottomViewOpacity}}>
          <Locationshare email={props.user.email} share={props.user.locationShare}/>
          <Animated.View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/1.75}}>
            <Animated.View style={{height:groupHeight,width:'100%',opacity:groupOpacity,justifyContent:'center',alignItems:'center'}}>
              <Families user={props.user}/>
            </Animated.View>
            <Animated.View style={{width:settingsWidth,height:settingsHeight,opacity:settingsOpacity,justifyContent:'center',alignItems:'center',display:settingsDisplay}}>
              <Settings close={()=>closeSettings()} user={props.user}/>
            </Animated.View>
            <Animated.View style={{height:newGroupFormHeight,width:'100%',opacity:newGroupFormOpacity,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>closeForm()} style={{width:-Dimensions.get('screen').width,height:'8%',borderRadius:10,position:'absolute',top:20,right:25,zIndex:100,display:newGroupFormDisplay}}>
                  <Image style={{height:30,width:30}} source={require('../settingsIcons/close.png')}/>
              </TouchableOpacity>
              <NewFamily user={props.user} finish={()=>closeForm()}/>
            </Animated.View>
          </Animated.View>
          <Animated.View style={{position:'absolute',bottom:0,right:0,left:0,width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/9.3,justifyContent:'center'}}>
              <Animated.View style={{height:menuButtonSize,width:menuButtonSize,position:'absolute',right:20,justifyContent:'center',alignItems:'center',zIndex:100}}>
                <TouchableOpacity style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>showButtons()}>
                  {menuOpen ? <View style={{height:'100%',width:'100%',backgroundColor:'red',borderRadius:50,justifyContent:'center',alignItems:'center'}}><Image style={{height:20,width:20}} source={require('../settingsIcons/close.png')}/></View>
                  : <View style={{height:'100%',width:'100%',backgroundColor:'#7F7FD5',borderRadius:50,justifyContent:'center',alignItems:'center'}}><Image style={{height:20,width:20}} source={require('../settingsIcons/plus.png')}/></View>}
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{opacity:settingOpacity,height:settingSize,width:settingSize,borderRadius:50,position:'absolute',backgroundColor:'#f7797d',right:20*3,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>openSettings()}>
                  <Image style={{height:20,width:20}} source={require('../settingsIcons/setting.png')}/>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{opacity:newGroupButtonOpacity,height:newGroupButtonSize,width:newGroupButtonSize,borderRadius:50,position:'absolute',backgroundColor:'#FBD786',right:20*6,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>openForm()}>
                  <Image style={{height:20,width:20}} source={require('../settingsIcons/plus.png')}/>
                </TouchableOpacity>
              </Animated.View>
          </Animated.View>
        </Animated.View>
        {!navigating ? <Animated.View style={{height:searchResultsHeight,width:Dimensions.get('screen').width,opacity:searchResultsOpacity}}>
          <PlaceSearchResults position={props.regionPosition} user={props.user} hide={()=>navigateClose()} />
        </Animated.View>
        : <Animated.View style={{height:navigateHeightInterpolate,width:Dimensions.get('screen').width,opacity:navigateOpacity}}>
          <View style={{height:'100%',width:'100%',position:'absolute',bottom:0}}>
            <Navigating />
          </View>
        </Animated.View>}
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
      left:0
  },
  ImageBox: {
      borderRadius: 50,
      borderColor: '#7F7FD5',
      borderWidth: 0.5,
      marginHorizontal:'3%'
  }
})