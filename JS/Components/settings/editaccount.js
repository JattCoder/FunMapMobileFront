import React,{ useState, useEffect } from 'react'
import ImagePicker from 'react-native-image-picker';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'

export default Editaccount = (props) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [photo,setphoto] = useState('')
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

    useEffect(()=>{
        setName(props.user.name)
        setEmail(props.user.email)
        setPhone(props.user.phone)
        setphoto(props.user.photo)
    })

    selectImage = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                setphoto(source)
              }
        });
    }

    return(
        <View style={{width:'100%',height:'100%',marginTop:'15%',alignItems:'center'}}>
            <View style={Style.ImageBox}>
                    {photo != '' ? <Image source={{ uri: photo }} /> : <Uimage name={user.name} />}
            </View>
            <View style={[Style.NameBox,{marginTop:'10%'}]}>
                <Text style={{color:'#00BFFF'}}>Name </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput value={name} onChangeText={(e)=>setName(e)} style={Style.NameInput}/>
            </View>
            <View style={[Style.NameBox,{marginTop:'3%'}]}>
                <Text style={{color:'#00BFFF'}}>Email  </Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <Text style={Style.NameInput}>{email}</Text>
            </View>
            <View style={[Style.NameBox,{marginTop:'3%'}]}>
                <Text style={{color:'#00BFFF'}}>Phone</Text>
                <TouchableOpacity style={{height:25,borderWidth:0.6,marginLeft:7,marginTop:-4,borderColor:'black'}}/>
                <TextInput value={phone} onChangeText={(e)=>setName(e)} style={Style.NameInput}/>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    ImageBox: {
        width: 95,
        height: 95,
        borderRadius: 100,
        backgroundColor:'#D3D3D3',
        shadowColor: "#00BFFF",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    NameBox:{
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.8,
        width:280,
        height:45,
        flexDirection:'row',
        padding:13,
        alignItems:'center'
    },
    NameInput:{
        paddingLeft:1,
        paddingRight:1,
        width:190,
        height:20,
        marginLeft:10,
        color:'#00BFFF',
    },
})