import firebase from 'firebase'
export const FAMILY = 'FAMILY'

export const family = (families = []) => {
    return (dispatch) => {
        fams = []
        families.map(id => {
            firebase.database().ref('FamilyGroups/'+id).on('value',(fam)=>{
                fams.push({
                    id,
                    name:fam.child('Name').val(),
                    message:fam.child('Message').val(),
                    members:fam.child('Members').val()
                })
            })
        })
        return dispatch({type: FAMILY, family: fams})
    }
}

