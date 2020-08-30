import React,{ useState, useEffect } from 'react'
import { View, Text } from 'react-native'

export default Uimage = (props) => {

    const [ini,setini] = useState('')

    useEffect(()=>{
        initials = ''
        letters = ''
        props.name.split(' ').forEach((word)=>{
            letters += word[0]
        })
        if(letters.length > 2){
            initials = `${letters[0]+letters[letters.length-1]}`
        }else{
            initials = `${letters[0]+letters[1]}`
        }
        setini(initials)
    })

    return(
        <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.2)',borderRadius:25}}>
            <Text style={{color:'black',backgroundColor:'rgba(0,0,0,0.0)',fontSize:20}}>{ini.toUpperCase()}</Text>
        </View>
    )
}