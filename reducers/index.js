import { combineReducers } from 'redux'
import login from './login'
import register from './register'
import recovery from './recover'
import recovered from './recovered'
import confirmacc from './confirmacc'
import mylocation from './mylocation'
import placesearch from './placesearch'
import marker from './marker'
import navigation from './navigation'

const rootreducers =  combineReducers({
  login,recovery,register,recovered,confirmacc,mylocation,placesearch,marker,navigation
})

export default rootreducers