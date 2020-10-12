import React,{ useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export default Families = (props) => {

    const [received,setReceived] = useState(false)

    getFamilies = () => {
        console.warn(props.user.id)
        var url = new URL("http://localhost:3000/account/families"),
            params = {id:props.user.id}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(res => {return res.json()})
        .then(groups => {
            if(groups.result == false)
                console.warn(groups.message)
            else console.warn(groups)
        })
        .catch(err => console.warn(err.message))
    }

    useEffect(()=>{
        if(props.user.id) getFamilies()
    })

    return(
        <View>
            <Text>Hello</Text>
        </View>
    )
}