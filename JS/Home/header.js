import React from 'react'
import Uimage from './uimage'
import Styles from './styles'
import Search from '../Components/search/search'
import { View, TouchableOpacity, Image} from 'react-native'

export default Header = (props) => {
    return(
        <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity style={Styles.ContactBox}></TouchableOpacity>
            <View style={Styles.SearchBox}>
                <Search position={props.position}/>
            </View>
            <TouchableOpacity style={Styles.ImageBox}>
                {props.user.photo != '' ? <Image source={{ uri: user.photo }} /> : <Uimage name={user.name} />}
            </TouchableOpacity>
        </View>
    )
}