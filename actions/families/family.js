import firebase from 'firebase'
export const FAMILY = 'FAMILY'
let punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
let spaceRE = /\s+/g

export const family = (email) => {
    return (dispatch) => {
        let families = {}
        firebase.database().ref(`FamilyGroups/`).on('value',(allGroups) => {
            //GOT ALL GROUPS
            if(allGroups.val()){ allGroups.forEach( group => {
                   if(email.replace(punctuation,'').replace(spaceRE,'') in group.child('Members/')){
                    firebase.database().ref('FamilyGroups/'+group.key).on('value',(myGroup)=>{
                            families[myGroup.child('Name').val()] = {
                                Name: myGroup.child('Name').val(),
                                Message: myGroup.child('Message').val(),
                                ID: myGroup.child('ID').val(),
                                Users:[],
                                GetTogether:[]
                            }
                            myGroup.child('GetTogether').forEach(gettogether => {
                                gt = {
                                    Name: gettogether.child('Name').val(),
                                    Address: gettogether.child('Address').val(),
                                    Time: gettogether.child('Time').val(),
                                    HostName: gettogether.child('HostName').val(),
                                    HostEmail: gettogether.child('HostEmail').val(),
                                }
                                families[myGroup.child('Name').val()]['GetTogether'].push(gt)
                            })
                            myGroup.child('Members').forEach(member => {
                                //Member key => member.key, value => member.val()
                                user = {
                                    Name: member.child('name').val(),
                                    Email: member.child('email').val(),
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
                            })
                            return dispatch({type: FAMILY, family: families})
                        })
                   }
            })}
        })
    }
}

