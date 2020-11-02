export const BACKCOLOR = 'BACKCOLOR'

export const backcolor = (id,backColor) => {
    return async (dispatch) => {
        return await fetch(`http://localhost:3000/account/${id}/settings/update/backColor`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,backColor})
        })
        .then(res => {return res.json()})
        .then(data => {
            dispatch({type: BACKCOLOR, settings: data.message})
        })
        .catch(err => console.log(err))
    }
}