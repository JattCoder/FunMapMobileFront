import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Image } from 'react-native'

export default Infowindow = (props) => {
    
    const [showme,setShowme] = useState(false)
    const [rating,setrating] = useState(0)

    useSelector((state)=>{
        if(state.marker.placeid == props.place.placeid) {
            if(showme == false)setShowme(true)
            if(rating == 0 && state.marker.rating != 0)setrating(state.marker.rating)
        }
    })

    return(
        <View>
            {showme == true ? <View style={{marginLeft:-38,marginBottom:5,borderWidth:0.3,borderRadius:25,padding:5,backgroundColor:'white'}}>
                {rating < 1 ? <Image style={Styles.Stars} source={require('../Stars/zero_star.png')}/>
                : rating < 2 ? <Image style={Styles.Stars} source={require('../Stars/one_star.png')}/>
                : rating < 3 ? <Image style={Styles.Stars} source={require('../Stars/two_star.png')}/>
                : rating < 4 ? <Image style={Styles.Stars} source={require('../Stars/three_star.png')}/>
                : rating < 5 ? <Image style={Styles.Stars} source={require('../Stars/four_star.png')}/>
                : rating == 5 ? <Image style={Styles.Stars} source={require('../Stars/five_star.png')}/>
                : null}
            </View> : null}
        </View>
    )
}