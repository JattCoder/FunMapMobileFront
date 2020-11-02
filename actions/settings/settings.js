export const SETTINGS = 'SETTINGS'

export const settings = (id) => {
    return async (dispatch) => {
        return await fetch(`http://localhost:3000/account/${id}/settings`)
        .then(res => {return res.json()})
        .then(data => {
            if(data.result == true) dispatch({type: SETTINGS, settings: data.message})
        })
        .catch(err => console.log(err))
    }
}