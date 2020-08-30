export const LOGIN_RES = 'LOGIN_RES'

const initialState = {
    code: '',
    message: '',
    result: false
}

export const reslogin = () => {
    return async (dispatch) => {dispatch({type: LOGIN_RES, payload: initialState})}
}