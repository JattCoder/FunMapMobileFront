export const REGISTER_RES = 'REGISTER_RES'

const initialState = {
    message: {},
    result: false
}

export const resregister = () => {
    return async (dispatch) => {dispatch({type: REGISTER_RES, response: initialState})}
}