export const ACCOUNT_RES = 'ACCOUNT_RES'

const initialState = {
    code: '',
    message: '',
    result: false
}

export const resaccount = () => {
    return async (dispatch) => {dispatch({type: ACCOUNT_RES, response: initialState})}
}