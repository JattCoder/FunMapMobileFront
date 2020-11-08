import React,{ useState } from 'react'
import { View, ScrollView, Text, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default BackgroundColor = () => {

    const uiColors = [
        {key:0,color:['#ffdde1','#ee9ca7']},{key:1,color:['#C6FFDD','#FBD786','#f7797d']},
        {key:2,color:['#dd1818','#333333']},{key:3,color:['#40E0D0','#FF8C00','#FF0080']},
        {key:4,color:['#f85032','#e73827']},{key:5,color:['#556270','#FF6B6B']},
        {key:6,color:['#8E2DE2','#4A00E0']},{key:7,color:['#7F00FF','#E100FF']},
        {key:8,color:['#6a3093','#a044ff']},{key:9,color:['#cc2b5e','#753a88']},
        {key:10,color:['#f953c6','#b91d73']},{key:11,color:['#00B4DB','#0083B0']},
        {key:12,color:['#667db6','#0082c8','#0082c8','#667db6']},{key:13,color:['#43C6AC','#191654']},
        {key:14,color:['#403B4A','#E7E9BB']}
    ]

    return(
        <View >
            <ScrollView style={{height:'100%',width:'100%'}} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
                {uiColors.map((color)=>{
                    return <LinearGradient colors={color.color} style={{height:Dimensions.get('window').height/2.2,width:'80%',marginVertical:'14%',borderRadius:10,borderColor:'white',borderWidth:0.5,shadowColor: color.color[color.color.length -1],
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 1.58,
                    shadowRadius: 16.00,
                    elevation: 24,}}>
                        <TouchableOpacity style={{height:'100%',width:'100%'}} onPress={()=>alert(color.key)}/>
                    </LinearGradient>
                })}
            </ScrollView>
        </View>
    )
}