export const FAMLIST = 'FAMLIST'

export const famlist = (info) => {
    return (dispatch) => {
        return dispatch({type: FAMLIST, famlist: info})
    }
}