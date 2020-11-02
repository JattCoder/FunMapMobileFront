export const FAMSELECTION = 'FAMSELECTION'

export const famselection = (id,famSelection) => {
    return async (dispatch) => {
        return await fetch(`http://localhost:3000/account/${id}/settings/update/famSelection`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,famSelection})
        })
        .then(res => {return res.json()})
        .then(data => {
            dispatch({type: FAMSELECTION, settings: data.message})
        })
        .catch(err => console.log(err))
    }
}