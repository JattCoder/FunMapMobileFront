import firebase from 'firebase'
const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g
const spaceRE = /\s+/g

export const updateDrivingMode = (drivingMode,email) => {
    console.warn('made it to here')
    // firebase.database().ref('Users/'+email.replace(punctuation,'').replace(spaceRE,'').update({
    //     drivingMode
    // }))
}

export const updateFerries = (ferries,email) => {
    firebase.database().ref('Users/'+email.replace(punctuation,'').replace(spaceRE,'').update({
        ferries
    }))
}

export const updateHighways = (highways,email) => {
    firebase.database().ref('Users/'+email.replace(punctuation,'').replace(spaceRE,'').update({
        highways
    }))
}

export const updateKm = (km,email) => {
    firebase.database().ref('Users/'+email.replace(punctuation,'').replace(spaceRE,'').update({
        km
    }))
}