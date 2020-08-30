export const REGISTER = 'REGISTER'

export const register = (name,email,phone,photo,password,rec,method,mac) => {
    return async (dispatch) => {
        return await fetch('http://localhost:3000/account/new',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,phone,photo,password,rec,method,mac})
        })
        .then(res => {return res.json()})
        .then(data => {dispatch({type: REGISTER, response: data})})
        .catch(err => console.log(err))
    }
}

// {
//     "code": "Success", 
//     "message": {
//         "email": "Harmandeep Mand.hm@gmail.com", 
//         "id": 3, 
//         "method": "App", 
//         "name": "Harmandeep Mand", 
//         "phone": "4403171521", 
//         "photo": ""}, 
//     "result": true
// }