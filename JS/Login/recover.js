import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { recover } from '../../actions/recover/account'
import { resaccount } from '../../actions/recover/resaccount'
import { recoverpin } from '../../actions/recover/pin'
import { confirmpin } from '../../actions/recover/confirmpin'
import Dialog from "react-native-dialog";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'

const Recover = (props) => {
    const[name,setname] = useState('')
    const[email,setemail] = useState('')
    const[pin,setpin] = useState('')
    const[ecode,setecode] = useState('')
    const[startRecovery,setstartRecovery] = useState(false)
    const[forgot,setforgot] = useState(false)
    const[rcode,setrcode] = useState(false)
    const dispatch = useDispatch()

    attemptRecovery = () => {
        if(name == '' || email == '' || pin == ''){
            if(name == '') alert('Name field is empty!')
            else if(email == '') alert('Email field is empty!')
            else if(pin == '') alert('PIN field is empty!')
        }else{
            setstartRecovery(true)
            dispatch(recover(name,email,pin))
        }
    }

    useSelector((state)=>{
        if(state.recovery.result == false && state.recovery.message != ''){
            alert(state.recovery.message)
            if(startRecovery == true) setstartRecovery(false)
            if(forgot == true) setforgot(false)
            dispatch(resaccount())
        }else if(state.recovery.result == true){
            if(state.recovery.message == 'Change Password'){
                if(rcode == true) setrcode(false)
                props.navigation.navigate('PassReset',{email: email})
            }else if(state.recovery.message == 'Check Your Email'){
                if(forgot == true) setforgot(false)
                if(rcode == false) setrcode(true)
            }
        }
    })

    forgotPIN = () => {
        if(name == '' || email == ''){
            if(name == '') alert('Name field is empty!')
            else if(email == '') alert('Email field is empty!')
        }else{
            setforgot(true)
            dispatch(recoverpin(name,email))
        }
    }

    return(
        <View style={Styles.Page}>
            {rcode == true ? <Dialog.Container visible={true}>
                <Dialog.Title>Check Your Email</Dialog.Title>
                <Dialog.Description>Enter Code Received in Email</Dialog.Description>
                <Dialog.Input textAlign={'center'} autoCapitalize = 'none' onChangeText={(e)=>setecode(e)}/>
                <Dialog.Button label='Cancel' onPress={()=>{alert('cancel')}}/>
                <Dialog.Button label='ReSend' onPress={()=>forgotPIN()} />
                <Dialog.Button label='Recover' onPress={()=>dispatch(confirmpin(email,ecode))}/>
            </Dialog.Container> : <Dialog.Container visible={false}>
                <Dialog.Title>Check Your Email</Dialog.Title>
                <Dialog.Description>Enter Code Received in Email</Dialog.Description>
                <Dialog.Input onChangeText={(e)=>setecode(e)}/>
                <Dialog.Button label='Cancel' onPress={()=>{alert('cancel')}}/>
                <Dialog.Button label='Recover' onPress={()=>dispatch(confirmpin(email,ecode))}/>
            </Dialog.Container>}
            <Text style={{color:'white',fontSize:25}}>Account Recovery</Text>
            <TouchableOpacity style={Styles.NameBox}>
                <Text style={{color:'white'}}>Name</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.NameInput} autoCapitalize = 'none' onChangeText={(e)=>setname(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.EmailBox}>
                <Text style={{color:'white'}}>Email</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.EmailInput} autoCapitalize = 'none' onChangeText={(e)=>setemail(e)}/>
            </TouchableOpacity>
            <Text style={Styles.PinCode}>Recovery PIN Code: It was set during Registration</Text>
            <TouchableOpacity style={Styles.PinBox}>
                <Text style={{color:'white'}}>PIN   </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput style={Styles.EmailInput} autoCapitalize = 'none' onChangeText={(e)=>setpin(e)}/>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Recover} onPress={()=>attemptRecovery()}>
                {startRecovery == false ? <Text style={Styles.RecoverText}>Recover</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Forgot} onPress={()=>forgotPIN()}>
                {forgot == false ? <Text style={Styles.ForgotText}>Forgot PIN</Text> : <ActivityIndicator size='small' color='#5810d8'/>}
            </TouchableOpacity>
        </View>
    )
}

export default Recover

const Styles = StyleSheet.create({
    Page:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5810d8'
    },
    NameBox:{
        marginTop:80,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    NameInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    EmailBox:{
        marginTop:20,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    EmailInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'white'
    },
    PinCode:{
        marginTop:20,
        color:'white'
    },
    PinBox:{
        marginTop:10,
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13
    },
    Recover:{
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
    RecoverText:{
        padding:12,
        color:'black'
    },
    Forgot:{
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
    ForgotText:{
        padding:12,
        color:'black'
    }
})