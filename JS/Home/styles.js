import React from 'react'
import { StyleSheet } from 'react-native'

export default Styles = StyleSheet.create({
    Page: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5810d8',
        position: 'absolute',
        top:0,
    },
    SearchBox: {
        marginTop: '20%',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 0.8,
        width: 280,
        height: 45,
        padding: 13,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    SearchInput: {
        paddingLeft: 1,
        paddingRight: 1,
        width: 210,
        height: 20,
        marginLeft: 10,
        color: 'black'
    },
    ImageBox: {
        marginTop: '20%',
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: '3%',
        marginRight: '3%'
    },
    ContactBox: {
        marginTop: '20%',
        width: 45,
        height: 45,
        borderRadius: 25,
        borderColor: 'black',
        marginLeft: '1%',
        marginRight: '3%'
    },
    SearchResults: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 14,
        width: 250,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center'
    },
    PlaceSelection:{
        position:'absolute',
        bottom:0,
        height:'40%',
        width:'100%',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 305.65,
        elevation: 10,
    },
    CloseSelection:{
        height:40,
        width:40,
        backgroundColor:'white',
        borderRadius:25,
        position:'absolute',
        bottom:352,
        right:10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 30.65,
        elevation: 8,
        justifyContent:'center',
        alignItems:'center'
    },
    FindMe:{
        height:'6%',
        width:'12%',
        position:'absolute',
        bottom:160,
        right:30
    }
})