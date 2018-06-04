import { combineEpics } from 'redux-observable'
import { JAYA_LOCAL_KEY } from '../settings'
import { map, tap, ignoreElements } from 'rxjs/operators'
import AuthAction from '../actions/auth'

const { localStorage } = window

const saveToken$ = actions$ =>
  actions$.ofType(
    AuthAction.STUDENT_LOGIN,
    AuthAction.PROFESSOR_LOGIN,
    AuthAction.ADMIN_LOGIN
  ).pipe(
    map(({ payload }) => payload.token),
    tap((token) => localStorage.setItem(JAYA_LOCAL_KEY, token)),
    ignoreElements()
  )

const removeToken$ = actions$ =>
  actions$.ofType(
    AuthAction.LOGOUT
  ).pipe(
    tap(() => localStorage.removeItem(JAYA_LOCAL_KEY)),
    ignoreElements()
  )

export default combineEpics(
  saveToken$,
  removeToken$
)
