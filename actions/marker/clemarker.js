export const CLEARMARKER = 'MARKER'

let initialState = {
    name: '',
    rating: '',
    placeID: '',
    location:{
        lat: 0.00,
        lng: 0.00,
    },
    formatted_address: '',
    formatted_phone_number: '',
    opening_hours: [],
    open_now: '',
    reviews: '',
    types: ''
}

export const clemarker = () => {
    return (dispatch) => {dispatch({type: CLEARMARKER, marker: initialState})}
}