export const REMOVEFAM = 'REMOVEFAM'

export const removefam = (info) => {
    return (dispatch) => {
        return dispatch({type: REMOVEFAM, family: info})
    }
}