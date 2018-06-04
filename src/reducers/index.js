import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as fromAuth from './auth'
import * as fromGlobal from './global'

export default combineReducers({
  global: fromGlobal.reducer,
  auth: fromAuth.reducer,
  router: routerReducer
})
