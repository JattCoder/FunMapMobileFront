export const UPDATESHARE = 'UPDATESHARE'

export const updateshare = (type) => {
    return (dispatch) => {dispatch({type: UPDATESHARE, updateshare: type})}
}