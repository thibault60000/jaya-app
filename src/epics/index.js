import { combineEpics } from 'redux-observable'
import authEpics$ from './auth'
import globalEpics$ from './global'

export default combineEpics(
  globalEpics$,
  authEpics$
)
