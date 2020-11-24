export const LOGIN_RES = 'LOGIN_RES'

export const reslogin = () => {
    return async (dispatch) => {dispatch({type: LOGIN_RES, message: {}, result: false})}
}