export const CLEARSRC = 'CLEARSRC'

export const clearsearch = () => {
    return async (dispatch) => { dispatch({type: CLEARSRC, placesearch: []})}
}