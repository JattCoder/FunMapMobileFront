export const NAVIGATION = 'NAVIGATION'

export const navigation = (stops = [],destination,status) => {
    return (dispatch) => {dispatch({type: NAVIGATION, navigate:{stops,destination,status}})}
}