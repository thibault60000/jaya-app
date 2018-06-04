import { combineEpics } from 'redux-observable'
import { JAYA_LOCAL_KEY } from '../settings'
import { of } from 'rxjs/observable/of'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { switchMap, first, catchError } from 'rxjs/operators'
import { studentLogin, professorLogin, adminLogin } from '../actions/auth'
import { appReady } from '../actions/global'
import { verifyToken } from '../services/user-service'

const { localStorage } = window

const setUpApp$ = actions$ =>
  actions$.pipe(
    first(),
    switchMap(() => {
      const jwtToken = localStorage.getItem(JAYA_LOCAL_KEY)
      if (jwtToken !== null) {
        return fromPromise(verifyToken())
          .pipe(
            switchMap(({ data }) => {
              let loggedInAction
              const userData = data.data

              switch (userData.type) {
                case 'STUDENT':
                  loggedInAction = studentLogin(userData)
                  break
                case 'PROFESSOR':
                  loggedInAction = professorLogin(userData)
                  break
                case 'ADMIN':
                  loggedInAction = adminLogin(userData)
                  break
                default:
                  throw new Error('UNKNOW TYPE')
              }

              return of(loggedInAction, appReady())
            }),
            catchError((e) => {
              console.log(e)
              localStorage.removeItem(JAYA_LOCAL_KEY)
              return of(appReady())
            })
          )
      } else {
        return of(appReady())
      }
    })
  )

export default combineEpics(
  setUpApp$
)
