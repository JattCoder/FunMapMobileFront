export const LOCSHARE = 'LOCSHARE'

export const locshare = (id,locShare) => {
    return async (dispatch) => {
        return await fetch(`http://localhost:3000/account/${id}/settings/update/locShare`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,locShare})
        })
        .then(res => {return res.json()})
        .then(data => {
            if(data.result == true) dispatch({type: LOCSHARE, settings: data.message})
        })
        .catch(err => console.log(err))
    }
}