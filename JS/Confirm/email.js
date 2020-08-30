import React,{ useState, useEffect } from 'react'
import { View, StyleSheet,Text,TouchableOpacity,TextInput, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { confirm } from '../../actions/confirmacc/confirm'
import { resconfirm } from '../../actions/confirmacc/resconfirm'
import { confirmcode } from '../../actions/confirmacc/confirmcode'
import DeviceInfo from 'react-native-device-info';
import Dialog from "react-native-dialog";

const Login = (props) => {

    const[code,setcode] = useState('')
    const[loaded,setloaded] = useState(false)
    const[submit,setsubmit] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!loaded){
            sendCode()
            setloaded(true)
        }
    })

    sendCode = () => {
        dispatch(confirm(props.route.params.user.name,props.route.params.user.email))
    }

    submitConfirm = () => {
        if(code == '') {
            alert('Please Enter Code')
        }else{
            if(submit != true){
                setsubmit(true)
                dispatch(confirmcode(props.route.params.user.email,code))
            }
        }
    }

    useSelector((state)=>{
        if(state.confirmacc.result == false && state.confirmacc.message != ''){
            alert(state.confirmacc.message)
            if(submit)setsubmit(false)
            dispatch(resconfirm())
        }else if(state.confirmacc.result == true && state.confirmacc.message == 'Account Confirmed'){
            props.navigation.navigate('Home',{user: props.route.params.user})
            dispatch(resconfirm())
        }
    })

    return(
        <View style={Styles.Page}>
            <Text style={{color:'white',fontSize:30}}>Welcome</Text>
            <Text style={{color:'white',fontSize:20,marginTop:10}}>{props.route.params.user.name}</Text>
            <Text style={{color:'white',fontSize:15,marginTop:100,alignContent:'center'}}>Email is not confirmed</Text>
            <Text style={{color:'white',fontSize:15}}>Please check your email for confirmation code</Text>
            <TouchableOpacity style={Styles.CodeBox}>
                <Text style={{color:'white'}}>Code</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.CodeInput} autoCapitalize = 'none' onChangeText={(e)=>setcode(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Submit} onPress={()=>submitConfirm()}>
                {submit == false ? <Text style={Styles.GoogleText}>Confirm</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Resent} onPress={()=>{sendCode()}}>
                <Text style={Styles.GoogleText}>Resend New Code</Text>
            </TouchableOpacity>
            <Text style={Styles.Cancel} onPress={()=>props.navigation.navigate('Login')}>Cancel</Text>
        </View>
    )
}

export default Login

const Styles = StyleSheet.create({
    Page:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5810d8'
    },
    CodeBox:{
        marginTop:20,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    CodeInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    Submit:{
        marginTop:60,
        borderRadius:25,
        backgroundColor:'white',
        height:45,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        width:250,
        flexDirection:'row'
    },
    Resent:{
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
    Cancel:{
        color:'white',
        marginTop:30,
        fontSize:15
    }
})