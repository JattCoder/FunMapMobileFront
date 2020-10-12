import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import Uimage from './uimage'
import Contacts from './contacts'
import Bottomweather from '../Components/bottomweather/bottomweather'
import { View, StyleSheet, TouchableOpacity, Image, Animated, TextInput, Linking, Dimensions, ScrollView } from 'react-native'

export default Bottom = (props) => {

    const[action,setaction] = useState(false)
    const[locationName,setLocationName] = useState('')
    const[search,setsearch] = useState('')
    const[sheight] = useState(new Animated.Value(-40))
    const[opacity] = useState(new Animated.Value(1))
    const[familyHeight] = useState(new Animated.Value(0))
    const[familyWidth] = useState(new Animated.Value(0))
    const[familyOpacity] = useState(new Animated.Value(0))
    const[actionType,setactionType] = useState('')
    const[dimentions] = useState(Dimensions.get('window'))
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
        if(state.sheet.result == true && state.sheet.type == 'Family & Settings'){
            if(actionType == '') setactionType('Family & Settings')
            Animated.parallel([
                Animated.timing(familyHeight,{
                    toValue:dimentions.height,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(familyWidth,{
                    toValue:dimentions.width,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(familyOpacity,{
                    toValue:1,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(sheight,{
                    toValue:0,
                    duration:100,
                    useNativeDriver:false
                }),
                Animated.timing(opacity,{
                    toValue:1,
                    duration:100,
                    useNativeDriver:false
                })
            ]).start()
        }else if(state.sheet.result == true && state.sheet.type == 'Marker Selection'){
            //hide Info
        }else if(state.sheet.result == true && state.sheet.type == 'Search'){
            //hide Info
        }else if(state.sheet.result == false){
            if(actionType != '') setactionType('')
            Animated.parallel([
                Animated.timing(familyHeight,{
                    toValue:0,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(familyWidth,{
                    toValue:0,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(familyOpacity,{
                    toValue:0,
                    duration:400,
                    useNativeDriver:false
                }),
                Animated.timing(sheight,{
                    toValue:5,
                    duration:100,
                    useNativeDriver:false
                }),
                Animated.timing(opacity,{
                    toValue:1,
                    duration:100,
                    useNativeDriver:false
                })
            ]).start()
        }
    })

    checkPermission = () => {
        if(locationName != ''){
            setaction(true)
        }else{
            //display alert box with message and button. 
            //message = You will be directed to settings to enable Location Sharing
            //button = Cancel
            Linking.openSettings()
        }
    }

    return(
        <View style={{height:'100%', width:'100%'}}>
            <View style={[Styles.Bottom,{height:'100%'}]}>
            <ScrollView onScroll={(e)=>{}} style={{width:60,borderTopWidth:3,marginTop:10,borderColor:'black'}}>

            </ScrollView>
                <View style={{height:'10%',width:'100%',flexDirection:'row',marginLeft:'7%'}}>
                    <TouchableOpacity style={Styles.ImageBox}>
                        {props.user.photo != '' ? <Image source={{ uri: props.user.photo }} /> : <Uimage name={user.name} />}
                    </TouchableOpacity>
                    <View>
                        <Bottomweather name={props.user.name} position={props.position}/>
                    </View>
                </View>
                <Animated.View style={{height:familyHeight,width:familyWidth,opacity:familyOpacity}}>
                    <Contacts user={props.user}/>
                </Animated.View>
            </View>
            <Animated.View style={{width:'100%',alignItems:'center',marginTop:sheight, opacity:opacity}}>
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
            </Animated.View>
        </View>
    )
}

const Styles = StyleSheet.create({
    Bottom:{
        width:'100%',
        height:'70%',
        backgroundColor: 'white',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        position:'absolute',
        alignItems:'center',
        bottom:0
    },
    ImageBox: {
        width: 45,
        height: 45,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: '3%',
        marginRight: '3%'
    }
})