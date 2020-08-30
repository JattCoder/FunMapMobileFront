export const CONFIRMACC = 'CONFIRMACC'

export const confirm = (name,email) => {
    return async (dispatch) => {
        return await fetch("http://localhost:3000/account/confirm",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email})
        })
        .then(res => {return res.json()})
        .then(data => {dispatch({type: CONFIRMACC, payload: data})})
        .catch(err => {
            let error = {
                code: 'Error: Network',
                message: 'Network Request Failed',
                result: false
            }
            dispatch({type: CONFIRMACC, payload: error})})
    }
}