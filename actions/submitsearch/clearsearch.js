export const CLEARSRC = 'CLEARSRC'

const initialState = []

export const clearsearch = () => {
    return async (dispatch) => { dispatch({type: CLEARSRC, placesearch: []})}
}