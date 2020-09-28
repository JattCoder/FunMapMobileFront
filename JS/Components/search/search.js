import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TextInput, StyleSheet, Text, ActivityIndicator, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Displaycard from './displaycard'
import { submitsearch } from '../../../actions/submitsearch/submitsearch'
import Geocoder from 'react-native-geocoder-reborn'
import Styles from './styles'
import { clearsearch } from '../../../actions/submitsearch/clearsearch'

export default Search = (props) => {
    const [input, setinput] = useState('')
    const [oldinput, setoldinput] = useState('')
    const [places, setplaces] = useState([])
    const dispatch = useDispatch()
    
    doneSearch = (results) => {
        if(places.length > 0) setplaces([])
        if(input != '') setinput('')
        dispatch(submitsearch(results))
        dispatch(clearsearch())
    }

    if (input != '' && input != oldinput) {
        let search = ''
        let Geo = {
            lat: props.position.latitude,
            lng: props.position.longitude
        };
        Geocoder.geocodePosition(Geo).then(res => {
            !input.includes(' in ') ? search = `${input} in ${res[0].locality}` : search = input 
            setTimeout(() => {
                var url = new URL("http://localhost:3000/account/search"),
                    params = { input: search }
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                fetch(url)
                    .then(res => { return res.json() })
                    .then(places => {
                        setplaces(places)
                    })
                    .catch(err => { console.log(err) })
            }, 700)
        }).catch(err => console.log(err))
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
                        </ScrollView> : <ActivityIndicator size='small' color='black' style={{ marginTop: '10%' }} />
                    : null}
            </View>
        </View>
    )
}