export const FAMILY = 'FAMILY'

export const family = (family = []) => {
    return (dispatch) => {
        return dispatch({type: FAMILY, family})
    }
}

