import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import recovery from './recover'
import recovered from './recovered'
import confirmacc from './confirmacc'
import mylocation from './mylocation'
import placesearch from './placesearch'
import navigate from './navigation'
import marker from './marker'

const rootreducers =  combineReducers({
  login,recovery,register,recovered,confirmacc,mylocation,placesearch,navigate,marker
})

export default rootreducers