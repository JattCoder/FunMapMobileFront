import React,{ useState } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions'

export default Navigate = () => {

    const dispatch = useDispatch()

    useSelector((state)=>{
        
    })

    return(
        <View>
            <MapViewDirections
                origin={{latitude:position.latitude,longitude:position.longitude}}
                destination={destination}
                apikey={'AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U'}/>
        </View>
    )
}
