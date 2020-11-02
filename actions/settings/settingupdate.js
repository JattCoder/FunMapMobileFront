export const SETTINGSUPDATE = 'SETTINGSUPDATE'

export const settingsupdate = (settings,id) => {
    return async (dispatch) => {
        return await fetch(`http://localhost:3000/account/${id}/settings/update`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
        .then(res => {return res.json()})
        .then(data => {
            if(data.result == true){
                dispatch({type: SETTINGSUPDATE, settings: data})
            }
        })
        .catch(err => console.log(err))
    }
}