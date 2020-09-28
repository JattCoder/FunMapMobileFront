import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import Uimage from './uimage'
import Location from '../FindMe/location'
import Bottomweather from '../Components/bottomweather/bottomweather'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default Bottom = (props) => {

    const[action,setaction] = useState(false)
    const[locationName,setLocationName] = useState('')
    const[search,setsearch] = useState('')
    let timer;

    onSearch = () => {
        if(locationName != ''){
            if(timer) clearTimeout(timer)
            !search.includes(' in ') ? search = `${search} in ${locationName}` : search
            timer = setTimeout(() => {
                var url = new URL("http://localhost:3000/account/search"),
                    params = { input: search }
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                fetch(url)
                .then(res => { return res.json() })
                .then(places => {
                    setplaces(places)
                })
                .catch(err => { console.log(err) })
            }, 500)
        }
    }

    useSelector((state)=>{
        if(state.mylocation.city != '' && state.mylocation.message == 'Allowed'){
            setLocationName(state.mylocation.city)
        }
    })

    checkPermission = () => {
        if(locationName != ''){
            setaction(true)
        }else{
            alert('Enable Location Sharing in Settings')
        }
    }

    return(
        <View style={{height:'100%', width:'100%'}}>
            <View style={Styles.Bottom}>
                <View style={{flexDirection:'row',height:'100%',width:'100%',alignItems:'center',marginLeft:'5%'}}>
                    <TouchableOpacity style={Styles.ImageBox}>
                        {props.user.photo != '' ? <Image source={{ uri: props.user.photo }} /> : <Uimage name={user.name} />}
                    </TouchableOpacity>
                    <View>
                        <Bottomweather name={props.user.name} position={props.position}/>
                    </View>
                </View>
            </View>
            <View style={{width:'100%',alignItems:'center'}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>checkPermission()} style={{width:action?'75%':'12%',height:50,borderRadius:25,backgroundColor:'#2a9df4',justifyContent:!action?'center':null,alignItems:'center',flexDirection:'row'}}>
                    <Image source={require('../GPS/search.png')} style={{height:25,width:25,marginLeft:'5%'}}/>
                    {action == true ? <View style={{height:'100%',width:'85%',alignItems:'center',flexDirection:'row'}}>
                        <View style={{borderWidth:0.5,borderColor:'white',marginLeft:'2%',height:'70%',width:0}} />
                        <TextInput onChangeText={(e)=>setsearch(e)} onEndEditing={()=>alert(search)} style={{width:'80%',height:'100%',marginLeft:'3%',fontSize:20,color:'white'}}/>
                        <TouchableOpacity onPress={()=>setaction(false)} style={{height:'50%',width:'9%',position:'absolute',right:7}}>
                            <Image style={{height:25,width:25}} source={require('../Markers/close.png')} />
                        </TouchableOpacity>
                    </View> : null}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    Bottom:{
        width:'100%',
        height:'75%',
        backgroundColor: 'white',
        borderRadius:50,
        position:'absolute',
        bottom:0,
        alignItems:'center',
        flexDirection:'row'
    },
    ImageBox: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: '3%',
        marginRight: '3%'
    },
    NL:{
        
    }
})