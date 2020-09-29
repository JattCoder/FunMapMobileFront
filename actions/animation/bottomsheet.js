export const BOTTOMSHEET = 'BOTTOMSHEET'

//Family & Settings ==> Self Slide (Full Way)
//Marker Selection  ==> Auto Slide (Half Way)

const initialState = {
    type: '',//Family & Settings or Marker Selection
    height: 0,
    result: false
}


export const bottomsheet = (animation) => {
    return (dispatch) => {dispatch({type: BOTTOMSHEET, sheet: animation})}
}