import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { passchange } from '../../actions/passchange/passchange'
import { respass } from '../../actions/passchange/respasschange'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native'

const Passreset = (props) => {
    const[pass,setpass] = useState('')
    const[rpass,setrpass] = useState('')
    const[change,setchange] = useState(false)
    const dispatch = useDispatch()

    changePass = () => {
        if(pass != '' && pass == rpass && pass.length >= 6){
            if(change != true){
                setchange(true)
                dispatch(passchange(props.route.params.email,pass))
            }else{
                alert("Apologize for Inconvenience, Still Updating your Password")
            }
        }else{
            alert('Please check your password entry')
        }
    }

    useSelector((state)=>{
        if(state.recovered.result == false && state.recovered.message != ''){
            alert(state.recovered.message)
            dispatch(respass())
        }else if(state.recovered.result == true){
            user = state.recovered.message
            if(user.confirmed == false) props.navigation.navigate('ConfirmLogin',{user: user})
            else props.navigation.navigate('Home')
        }
    })

    return(
        <View style={Styles.Page}>
            <Text style={Styles.Heading}>Password Change</Text>
            <Text style={{color:'white',marginTop:10}}>{props.route.params.email}</Text>
            <TouchableOpacity style={Styles.PassBox}>
                <Text style={{color:'white'}}>Pass </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.PassInput} secureTextEntry={true} autoCapitalize = 'none' onChangeText={(e)=>setpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.RPassBox}>
                <Text style={{color:'white'}}>Pass </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.RPassInput} secureTextEntry={true} autoCapitalize = 'none' onChangeText={(e)=>setrpass(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Change} onPress={()=>changePass()}>
                {change == false ? <Text style={Styles.ChangeText}>Change Password</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
        </View>
    )
}

export default Passreset

const Styles = StyleSheet.create({
    Page:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5810d8'
    },
    Heading:{
        fontSize:25,
        color:'white',
        marginTop:150,
    },
    PassBox:{
        marginTop:80,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    PassInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    RPassBox:{
        marginTop:20,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    RPassInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    Change:{
        marginTop:20,
        borderRadius:25,
        backgroundColor:'white',
        height:45,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        width:250,
        flexDirection:'row'
    },
    ChangeText:{
        padding:12,
        color:'black'
    }
})
