export const NEWFAM = 'NEWFAM'

export const newfam = (info) => {
    return (dispatch) => {
        return dispatch({type: NEWFAM, family: info})
    }
}