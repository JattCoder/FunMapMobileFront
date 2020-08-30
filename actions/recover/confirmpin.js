export const CONFIRM_PIN = 'CONFIRM_PIN'

export const confirmpin = (email,code) => {
    return async (dispatch) => {
        var url = new URL("http://localhost:3000/recover/confirmpin"),
            params = {email,code}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        return await fetch(url)
        .then(res => {return res.json()})
        .then(data => {
            dispatch({type: CONFIRM_PIN, response: data})})
        .catch(err => console.log(err))
    }
}