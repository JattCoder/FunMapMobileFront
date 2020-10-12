export const BOTTOMSHEET = 'BOTTOMSHEET'

//Family & Settings ==> Self Slide (Full Way)
//Marker Selection  ==> Auto Slide (Half Way)

const initialState = {
    type: '',//Family & Settings or Marker Selection
}


export const bottomsheet = (animation) => {
    console.log('Recieving: ',animation)
    return (dispatch) => {dispatch({type: BOTTOMSHEET, sheet: animation})}
}