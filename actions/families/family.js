export const FAMILY = 'FAMILY'

export const family = (info) => {
    return async (dispatch) => {
        return await fetch(`http://localhost:3000/account/new_family`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => {return res.json()})
        .then(data => console.warn(data))
        .catch(err => {
            dispatch({type: FAMILY, family: err.message})})
    }
}