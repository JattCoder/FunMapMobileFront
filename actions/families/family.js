import firebase from 'firebase'
export const FAMILY = 'FAMILY'

export const family = (id) => {
    return (dispatch) => {
        var url = new URL("http://localhost:3000/account/families"),
            params = {id}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(res => {return res.json()})
        .then(groups => {
            if(groups.result == true){
                groups.message.map((group)=>{
                    group[1].map((member)=>{
                        firebase.database().ref(`FamilyGroups/${group[0].id}/${member.id}`).on('value',(snapshot) => {
                            if(snapshot.val()){
                                console.warn(snapshot.val().longitude)
                               member.action = snapshot.val().action
                               member.batteryLevel = snapshot.val().batteryLevel
                               member.charging = snapshot.val().charging
                               member.heading = snapshot.val().heading
                               member.latitude = snapshot.val().latitude
                               member.longitude = snapshot.val().longitude
                               member.location = snapshot.val().location
                               member.name = snapshot.val().name
                               member.navigation = snapshot.val().navigation
                               member.permitted = snapshot.val().permitted
                               member.speed = snapshot.val().speed

                              return dispatch({type: FAMILY, family: groups.message})
                           }
                        })
                    })
                })
            }
        })
        .catch(err => console.warn(err.message))
    }
}

