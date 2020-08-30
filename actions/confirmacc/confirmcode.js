export const CONFIRM_CODE = 'CONFIRM_CODE'

export const confirmcode = (email,code) => {
    return async (dispatch) => {
        return await fetch("http://localhost:3000/account/confirm/code",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,code})
        })
        .then(res => {return res.json()})
        .then(data => {dispatch({type: CONFIRM_CODE, payload: data})})
        .catch(err => {
            let error = {
                code: 'Error: Network',
                message: 'Network Request Error',
                result: false
            }
            dispatch({type: CONFIRM_CODE, payload: error})
        })
    }
}