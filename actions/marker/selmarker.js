export const MARKER = 'MARKER'

export const selmarker = (place) => {
    return async (dispatch) => {
        await fetch(`http://localhost:3000/account/spot/${place.placeid}`)
            .then(res => {return res.json()})
            .then(data => {
                if(data == null){
                    setreceived(false)
                }else{
                    info = {
                        name: place.name,
                        rating: place.rating,
                        placeid: place.placeid,
                        lat: place.geo.lat,
                        lng: place.geo.lng,
                        formatted_address: data.formatted_address,
                        formatted_phone_number: data.formatted_phone_number,
                        opening_hours: data.opening_hours,
                        open_now: data.open_now,
                        reviews: data.reviews,
                        types: data.types
                    }
                    dispatch({type: MARKER, marker: info})
                }
            })
            .catch(err => console.log(err))
    }
}