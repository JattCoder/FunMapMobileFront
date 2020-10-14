export const FAMILY = 'FAMILY'

export const family = (info) => {
    return (dispatch) => {
        console.log(info)
        return dispatch({type: FAMILY, family: info})
    }
}