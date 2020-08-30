export const PASS_RES = 'PASS_RES'

const initialState = {
    code: '',
    message: '',
    result: false
}

export const respass = () => {
    return async (dispatch) => {dispatch({type: PASS_RES, response: initialState})}
}