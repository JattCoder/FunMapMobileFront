import React,{ useState } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

export default PlaceSearcgResults = (props) => {

    const [placeInfo,setPlaceInfo] = useState({
        name:''
    })
    const [images,setImages] = useState([])

    getPhotos = () => {
        imgs = []
        placeInfo.photos.map(photo => {
            fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
            .then(res => {return res.blob()})
            .then(img => console.warn(img._data))
            .catch(err => console.warn(err))
        })
        setImages(imgs)
    }

    getRoute = () => {
        //distance -> result.routes[0].legs.distance.text
        //duration -> result.routes[0].legs.duration.text
        //km -> metric
        //mi -> imperial
        //This is get me timestamp of expected arrival time
        //This is how result is given to us
// duration = {
//     text: "1 day 19 hours",
//     value: 154898
//   }
  
//   //This is how we are getting 
//   extenDays = duration.text.includes('day') 
//   ? parseInt(duration.text.split(' ')[0]) + (parseInt(duration.text.split(' ')[2])/24) 
//   : parseInt(duration.text.split(' ')[0])/24
  
//   nextDate = new Date().setDate(new Date().getDate()+extenDays)
  
//   console.warn('Duration Date: '+new Date(nextDate))
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=California&destination=New York&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
        .then(res => {return res.json()})
        .then(result => {
            if(parseInt(result.routes[0].legs.distance.text.split(' ')[0]) > 6){
                let dist = 0
                result.routes[0].legs.steps.map(step => {
                    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${step.start_location.lat},${step.start_location.lng}&destination=${step.end_location.lat},${step.end_location.lng}&key=AIzaSyDMCLs_nBIfA8Bw9l50nSRwLOUByiDel9U`)
                    .then(sres => {return sres.json()})
                    .then(sresult => {
                        dist = sresult.routes[0].legs.distance.text.split(' ')[0]+dist+'mi'
                        duration = sresult.routes[0].legs.duration.text.
                    })
                    .catch(serr => console.warn(serr))
                })
            }
        })
        .catch(err => console.warn(err))
    }

    useSelector((state)=>{
        if(state.marker != placeInfo){
            setPlaceInfo(state.marker)
            if(placeInfo.name != '') getPhotos()
        }
    })


    return( placeInfo.name != '' ? <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height/1.5,alignItems:'center'}}>
        <View style={Styles.Icon}><Image style={{height:'50%',width:'50%',padding:'10%'}} source={{uri:placeInfo.icon}}/></View>
        <Text style={{fontWeight:'bold',color:'white',fontSize:20,margin:'3%'}}>{placeInfo.name}</Text>
        <Text style={{alignContent:'center',fontSize:11}}>{placeInfo.address}</Text>
        <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginVertical:'4%',flexDirection:'row'}}>
            <View style={{height:35,width:35,borderRadius:50,justifyContent:'center',alignItems:'center',borderColor:'#7F7FD5',borderWidth:1}}>
                <Image style={{height:17,width:17}} source={require('../../settingsIcons/star.png')} />
                <Text style={{fontSize:10}}>{placeInfo.rating}</Text>
            </View>
            <View style={{height:35,width:35,borderRadius:50,justifyContent:'center',alignItems:'center',borderColor:'#7F7FD5',borderWidth:1,marginHorizontal:'4%'}}>
                {placeInfo.priceLevel <= 1 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/greenDollar.png')}/> 
                : placeInfo.priceLevel <= 2 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/orangeDollar.png')}/>
                : placeInfo.priceLevel <= 3 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/completeOrangeDollar.png')}/>
                : placeInfo.priceLevel <= 4 ? <Image style={{height:25,width:25}} source={require('../../settingsIcons/redDollar.png')}/>
                : <Image style={{height:25,width:25}} source={require('../../settingsIcons/completeRedDollar.png')}/>}
            </View>
            <TouchableOpacity onPress={()=>console.warn('add it to favs')} style={{height:35,width:35,borderRadius:50,justifyContent:'center',alignItems:'center',borderColor:'#7F7FD5',borderWidth:1}}>
                <Image style={{height:25,width:25}} source={require('../../settingsIcons/fav.png')} />
            </TouchableOpacity>
        </View>
        <View style={{width:'100%',height:'10%',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>getRoute()} style={{width:'40%',backgroundColor:'#7F7FD5',height:'70%',marginLeft:'5%',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Navigate</Text>
            </TouchableOpacity>
        </View>
    </View> : null )
}

const Styles = StyleSheet.create({
    Icon:{
        width:Dimensions.get('screen').width/7.2,
        height:Dimensions.get('screen').height/17.2,
        borderRadius:50,
        borderLeftColor:'#7F7FD5',
        borderTopColor:'rgba( 0, 0, 0, 0.0)',
        borderBottomColor:'#7F7FD5',
        borderRightColor:'#7F7FD5',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderLeftWidth:2,
        borderRightWidth:2
    },
    Outer:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:'1%',
        marginHorizontal:'1%',
    },
    Item:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:15,
        borderWidth:0.5,
        borderStartColor:'white',
        marginVertical:'1%',
        shadowColor:'white',
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 50,
    }
})