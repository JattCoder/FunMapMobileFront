import React from 'react'
import { View, Text } from 'react-native'

export default Invitations = (props) => {
    return(
        <View style={{height:'100%',width:'100%'}}>
            <View>
                {props.invitations.map((invitation)=>{
                    console.warn(invitation)
                    return <View>
                        <Text>{invitation.gname}</Text>
                    </View>
                })}
            </View>
        </View>
    )
}