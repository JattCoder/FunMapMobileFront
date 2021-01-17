import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Geocoder from 'react-native-geocoder-reborn'
import { mylocation } from '../../../actions/mylocation/mylocation'

export default FollowPath = (props) => {

    const [path,setPath] = useState([])
    const [distance,setDistance] = useState(-1)
    const [currentLocation,setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        street: ''
    })
    const [nextSpot,setNextSpot] = useState({
        latitude:0,
        longitude:0,
        street: ''
    })

    //Step 1
    getNextSpotStreetName = () => {
        if(path.length > 0)
            Geocoder.geocodePosition({lat: path[0].latitude, lng: path[0].longitude}).then(res => {
                if(res){
                    setNextSpot({
                        latitude:path[0].latitude,
                        longitude:path[0].longitude,
                        street:res.location.street
                    })
                    checkIfCurrentLocationAndNextStopIsOnSameStreet(currentLocation.street,nextSpot.street)
                }
            }).catch(err => {
                    //getNextSpotStreetName()
            })
    }

    //Step 2
    checkIfCurrentLocationAndNextStopIsOnSameStreet = (currentStreet,nextStreet) => {//distanceBetweenTwoPoints()
        if(currentStreet == nextStreet){
            console.warn('on Same street')
            //check the distance
            //if distance is less than before, then no need to do anything
            //if distance is more than before, then delete first point from array of path 
        }else{
            console.warn('Different Street')
            //could be lag or any kind of error.. 
            //re-route
        }
    }

    //Step 3
    distanceBetweenTwoPoints = () => {
        //console.warn('check distance between 2 points')
        //Check if Next Spot is getting closer, then let it get closer and keep an eye on it everytime page updates with new location
        //If getting further away from First point, then get back to Step 1 for Second Spot

        //If getting closer to Point and its an last spot in path array, then about to arrive at destination
    }

    useSelector(state=>{
        if(props.path){
            if(state.mylocation.latitude != currentLocation.latitude 
                || state.mylocation.longitude != currentLocation.longitude && state.mylocation.street != null) setCurrentLocation({
                    latitude: state.mylocation.latitude,
                    longitude: state.mylocation.longitude,
                    street: state.mylocation.street
                })
        }else{

        }
    })

    useEffect(()=>{
        setPath(props.path)
        getNextSpotStreetName()
    })


    return null
}



routeCheck = () => {
    //Create another file, where we will be cheking if user if passing by geo spots of polyline

    //if near or on the geo spot, then grab next geo spot and 
    //check if getting further from first one and getting close to next one

    //getting further from first one and not getting closer to second one, then warn user and find another route from
    //currect location

    //NEED TO KEEP IN MIND, GIVE SOME TIME TO DEVICE TO GET BACK ON TRACK, SOMETIMES DEVICES ARE LAGGY

    //NEED TO TUNE UP A BIT, SO IT'S ACCURATE AS POSSIBLE
    //console.warn(props.position.latitude)


    //Solution #1
    //Check if im on same street using geolocation and focus on geo spots
    //THINGS I WILL BE NEEDING
    //Step 1 My Location (Street Name, i can get it using props)
    //       Next Geo Spot Location (Street Name) Using GeoLocation
    //Step 2 Keep an eye on GeoSpot, how far it is. 
    //       If we are on it or started getting further away and check if we are getting close to second geo spot
    //       If yes to line above and check if we are on same street as next geo spot, then we are good to keep an eye on second geo spot
    //       Get Back to Step 1
    //Step 3 If user and destination is on same street, and check how far is the destination, if 0.2 or more
    
}