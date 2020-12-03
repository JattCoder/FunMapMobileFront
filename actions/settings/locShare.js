export const LOCSHARE = 'LOCSHARE'

export const locshare = (locShare) => {
    return async (dispatch) => {
        return dispatch({type: LOCSHARE, settings: locShare})
    }
}