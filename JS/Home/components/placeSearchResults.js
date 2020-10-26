import React,{ useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

export default PlaceSearcgResults = () => {

    const [places,setPlaces] = useState([])

    useSelector((state)=>{
        if(places != state.placesearch){
            //setPlaces(state.placsearch)
        }
    })

    return(
        <View>
            
            {/* {places.map((place,index)=>{
                <Text key={index}>{place.name}</Text>
            })} */}
        </View>
    )
}