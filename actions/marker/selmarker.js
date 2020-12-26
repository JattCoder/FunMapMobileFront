export const MARKER = 'MARKER'

export const selmarker = (place) => {
    return async (dispatch) => {dispatch({type: MARKER, marker: place})}
}