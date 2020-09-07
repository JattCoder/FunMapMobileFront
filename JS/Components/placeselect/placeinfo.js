import React,{ useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, Linking } from 'react-native'
import { mylocation } from '../../../actions/navigation/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default Placeinfo = (props) => {
    let star = props.place.rating
    const dispatch = useDispatch()
    const [received,setreceived] = useState(false)
    const [info,setinfo] = useState({
        formatted_address: '',
        formatted_phone_number:'',
        opening_hours: '',
        open_now: '',
        reviews: '',
        types: ''
    })

    useEffect(()=>{
        getInfo()
    })

    getInfo = async () => {
        if(received == false){
            setreceived(true)
            await fetch('http://localhost:3000/account/spot')
            .then(res => {return res.json()})
            .then(info => {
                if(info == null){
                    setreceived(false)
                }else{
                    let hours = ''
                    info.opening_hours.map((day)=>{hours += `${day}\n`})
                    setinfo({
                        formatted_address: info.formatted_address,
                        formatted_phone_number: info.formatted_phone_number,
                        opening_hours: hours,
                        open_now: info.open_now,
                        reviews: info.reviews,
                        types: info.types
                    })
                }
            })
        }
    }

    findRoute = () => {
        //display dialog box with loading
        dispatch(mylocation({},{}))
    }

    return(
        <View style={Styles.BottomTab}>
                <View style={{marginTop:'10%',marginLeft:'5%',flexDirection:'row'}}>
                    <Text style={{fontSize:20}}>{props.place.name}</Text>
                    {star < 1 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/zero_star.png')}/>
                    : star < 2 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/one_star.png')}/>
                    : star < 3 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/two_star.png')}/>
                    : star < 4 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/three_star.png')}/>
                    : star < 5 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/four_star.png')}/>
                    : star == 5 ? <Image style={{marginLeft:'5%',height:'100%',width:'25%'}} source={require('../../Stars/five_star.png')}/>
                    : null}
                </View>
                <View style={{height:'100%',width:'100%'}}>
                    {info.formatted_address == '' ? <View style={{height:'60%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size='large' color='black'/>
                    </View>
                    : <View style={{height:'100%',width:'100%',marginLeft:'5%',marginTop:'2%'}}>
                        <Text style={{height:'15%',width:'60%',marginTop:'1.5%'}}>{info.formatted_address}</Text>
                        <Text style={{width:'60%'}}>{info.opening_hours}</Text>
                        <View style={{flexDirection:'row',width:'100%'}}>
                            <TouchableOpacity onPress={()=>findRoute()} style={{borderWidth:0.5,borderRadius:25,height:40,width:150,backgroundColor:'#5810d8',justifyContent:'center',alignItems:'center'}}>
                                <View style={{flexDirection:'row',width:'100%',height:'55%',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'white'}}>Navigate</Text>
                                    <Image style={{height:'90%',width:'13%',marginLeft:'4%'}} source={require('../../Arrow/arrow_marker.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Linking.openURL(`tel:${info.formatted_phone_number}`)} style={{borderWidth:0.5,borderColor:'#5810d8',marginLeft:20,borderRadius:25,height:40,width:130,justifyContent:'center',alignItems:'center'}}>
                                <View style={{flexDirection:'row',width:'100%',height:'55%',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#5810d8'}}>Call</Text>
                                    <Image style={{height:'90%',width:'13%',marginLeft:'10%'}} source={require('../../Phone/phone.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>}
                </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    BottomTab:{
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        borderTopRightRadius:85,
    }
})