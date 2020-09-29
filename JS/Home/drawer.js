import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { bottomsheet } from '../../actions/animation/bottomsheet'
import { StyleSheet, Animated } from 'react-native'

//<Bottom user={props.user} position={props.regionPosition}/>
export default Drawerr = (props) => {

  const[height,setheight] = useState(new Animated.Value(120))
  const[animated,setanimated] = useState(false)
  const dispatch = useDispatch()

  animate = () => {
      if(animated){
        Animated.timing(height, {
          toValue : 1000,
          timing : 500,
          useNativeDriver: false
        }).start(()=>{
          dispatch(bottomsheet({type:'Family & Settings',height: 60,result: true}))
          setanimated(false)
        })
      }else{
        Animated.timing(height, {
          toValue : 120,
          timing : 500,
          useNativeDriver: false
        }).start(()=>{
          dispatch(bottomsheet({type:'',height: 0,result: false}))
          setanimated(true)
        })
      }
  }

  return(
     <Animated.View onTouchMove={()=>animate()} style={[Styles.Sheet,{height: height}]}>
        <Bottom user={props.user} position={props.regionPosition}/>
     </Animated.View>
  )
}

const Styles = StyleSheet.create({
  Sheet:{
    width:'100%',
    bottom:0,
    position:'absolute'
  }
})