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
                                Users:[]
                            }
                            myGroup.child('Members').forEach(member => {
                                //Member key => member.key, value => member.val()
                                firebase.database().ref('Users/'+member.key).once('value',(userInfo)=>{
                                    user = {
                                        Name: userInfo.child('name').val(),
                                        Email: userInfo.child('email').val(),
                                        Phone: userInfo.child('phone').val(),
                                        Photo: userInfo.child('photo').val(),
                                        Address: userInfo.child('address').val(),
                                        Latitude: userInfo.child('latitude').val(),
                                        Longitute: userInfo.child('longitude').val(),
                                        Heading: userInfo.child('heading').val(),
                                        Speed: userInfo.child('speed').val(),
                                        Member: member.child('Member').val(),
                                        LocationShare: member.child('locationShare').val()
                                    }
                                    families[myGroup.child('Name').val()]['Users'].push(user)
                                    return dispatch({type: FAMILY, family: families})
                                })
                            })
                        })
                   }
            })}
        })
    }
}

