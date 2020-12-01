import firebase from 'firebase'
export const FAMILY = 'FAMILY'
let punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
let spaceRE = /\s+/g

export const family = (email) => {
    return (dispatch) => {
        let families = {}
        firebase.database().ref(`FamilyGroups/`).once('value',(allGroups) => {
            if(allGroups.val()){ allGroups.forEach( group => {
                   if(group.child('Members/'+email.replace(punctuation,'').replace(spaceRE,''))){
                        firebase.database().ref('FamilyGroups/'+group.key).on('value',(myGroup)=>{
                            families[myGroup.child('Name').val()] = {
                                Name: myGroup.child('Name').val(),
                                Message: myGroup.child('Message').val(),
                                ID: myGroup.child('ID').val(),
                                Users:[]
                            }
                            myGroup.child('Members').forEach(member => {
                                //Member key => member.key, value => member.val()
                                user = {
                                    Name: member.child('name').val(),
                                    Phone: member.child('phone').val(),
                                    Photo: member.child('photo').val(),
                                    Address: member.child('address').val(),
                                    Latitude: member.child('latitude').val(),
                                    Longitute: member.child('longitude').val(),
                                    Heading: member.child('heading').val(),
                                    Speed: member.child('speed').val(),
                                    Member: member.child('member').val(),
                                    LocationShare: member.child('locationShare').val(),
                                    Charging: member.child('charging').val(),
                                    BatteryLevel: member.child('batteryLevel').val()
                                }
                                families[myGroup.child('Name').val()]['Users'].push(user)
                                return dispatch({type: FAMILY, family: families})
                            })
                        })
                   }
            })}
        })
    }
}

