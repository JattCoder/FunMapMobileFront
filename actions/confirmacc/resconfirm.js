export const RESCONFIRM = 'RESCONFIRM'

let initialState = {
    code: '',
    message: '',
    result: false
}

export const resconfirm = () => {
    return async (dispatch) => {
        return dispatch({type: RESCONFIRM, payload: initialState})
    }
}