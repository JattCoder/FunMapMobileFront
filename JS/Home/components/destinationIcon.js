import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, Image } from 'react-native'

export default DestinationIcon = (props) => {

    const [driving,setDriving] = useState(false)
    const [navigation,setNavigation] = useState(false)
    const [icon,setIcon] = useState('')

    useEffect(()=>{
        setDriving(props.active)
        setNavigation(props.pathLength > 0 ? true : false)
    },[props.pathLength,props.active])

    return(
        <View style={{backgroundColor:'red',marginTop:10}}>
            {navigation ? !driving ? <Image style={{height:40,width:40}} source={require('../../settingsIcons/destinationicon.png')}/> : console.warn('will display icon without frame') : null}
        </View>
    )

}