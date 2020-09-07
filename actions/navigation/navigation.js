export const NAVIGATION = 'NAVIGATION'

export const mylocation = (currentlocation,destination) => {
    return (dispatch) => {dispatch({type: NAVIGATION, navigation: {currentlocation,destination}})}
}