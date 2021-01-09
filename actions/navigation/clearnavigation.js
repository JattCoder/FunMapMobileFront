export const CLEAR_NAVIGATION = 'CLEAR_NAVIGATION'

export const clearnavigation = () => {
    return (dispatch) => {dispatch({type: CLEAR_NAVIGATION, navigate: {active:false,path:[]}})}
}