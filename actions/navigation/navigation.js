export const NAVIGATION = 'NAVIGATION'

export const navigation = (active,path) => {
    return (dispatch) => {dispatch({type: NAVIGATION, navigate:{active,path}})}
}