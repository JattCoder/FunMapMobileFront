export const MYLOCATION = 'MYLOCATION'

export const mylocation = (geo) => {
    return (dispatch) => {dispatch({type: MYLOCATION, payload: geo})}
}