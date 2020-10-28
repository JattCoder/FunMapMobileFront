export const CURRENTFAMILY = 'CURRENTFAMILY'

export const currentfamily = (mapfamily) => {
    return (dispatch) => {dispatch({type: CURRENTFAMILY, mapfamily})}
}