import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TextInput, StyleSheet, Text, ActivityIndicator, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Displaycard from './displaycard'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import Geocoder from 'react-native-geocoder-reborn';

export default Search = (props) => {
    const [input, setinput] = useState('')
    const [oldinput, setoldinput] = useState('')
    const [places, setplaces] = useState([])
    const [timer,settimer] = useState(0)
    const dispatch = useDispatch()
    let timeout
    doneSearch = (results) => {
        if(places.length > 0) setplaces([])
        if(input != '') setinput('')
        dispatch(submitsearch(results))
    }

    if (input != '' && input != oldinput) {
        let search = ''
        let Geo = {
            lat: props.position.latitude,
            lng: props.position.longitude
        };
        console.log('Geo..'+props.position.latitude)
        Geocoder.geocodePosition(Geo).then(res => {
            !input.includes(' in ') ? search = `${input} in ${res[0].locality}` : search = input 
            console.log('Searching...'+search)
            setTimeout(() => {
                var url = new URL("http://localhost:3000/account/search"),
                    params = { input: search }
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                fetch(url)
                    .then(res => { return res.json() })
                    .then(places => {
                        console.log(places.length)
                        setplaces(places)
                    })
                    .catch(err => { console.log(err) })
            }, 700)
        })
        .catch(err => console.log(err))
        setoldinput(input)
    } else if (input == '') {
        if (places.length > 0) setplaces([])
    }
    return (
        <View style={Styles.Page}>
            <View style={{ flexDirection: 'row' }}>
                {input == '' ?
                    <View style={{ marginLeft: 35, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 20 }}>Search</Text>
                        <TouchableOpacity activeOpacity={1} style={{ height: 18, borderWidth: 0.8, marginLeft: 10 }} />
                    </View> : null}
                <TextInput onChangeText={(e) => setinput(e)} value={input} style={Styles.Input} onSubmitEditing={() => doneSearch(places)} />
                {input != '' ?
                    <TouchableOpacity style={Styles.Clear} onPress={() => setinput('')}>
                        <Text>X</Text>
                    </TouchableOpacity> : null}
            </View>
            <View style={{ alignItems: 'center' }}>
                {input != '' ?
                    places.length > 0 ?
                        <ScrollView showsVerticleScrollIndicator={false} style={Styles.List}>
                            {places.map((item) => {
                                return <TouchableOpacity key={item.place_id} onPress={() => doneSearch([item])}>
                                    <Displaycard item={item} />
                                </TouchableOpacity>
                            })}
                        </ScrollView> : <ActivityIndicator size='small' color='black' style={{ marginTop: '10%' }} /> : null}
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    Page: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    Clear: {
        borderRadius: 25,
        height: 20,
        width: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    Input: {
        paddingHorizontal: 15,
        width: '100%',
    },
    List: {
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: '6%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        maxHeight: 400,
        minHeight: 110
    }
})