import { combineReducers } from 'redux'
import login from './login'
import recovery from './recover'
import recovered from './recovered'
import confirmacc from './confirmacc'
import mylocation from './mylocation'
import placesearch from './placesearch'
import marker from './marker'
import navigation from './navigation'
import sheet from './animation'
import family from './family'
import invitations from './invitations'
import mapfamily from './mapfamily'
import settings from './settings'
import members from './members'

const rootreducers =  combineReducers({
  login,recovery,recovered,confirmacc,mylocation
  ,placesearch,marker,navigation,sheet,family,invitations
  ,mapfamily,settings,members
})

export default rootreducers