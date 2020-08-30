export const SUBMITSRC = 'SUBMITSRC'

export const submitsearch = (places) => {
    return async (dispatch) => { dispatch({type: SUBMITSRC, placesearch: places})}
}