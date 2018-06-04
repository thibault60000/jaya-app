const STUDENT_LOGIN = '[Auth][student] Logged In !'
const ADMIN_LOGIN = '[Auth][Admin] Logged In !'
const PROFESSOR_LOGIN = '[Auth][Prof] Logged In !'

const LOGOUT = '[Auth] Logout'

export const studentLogin = payload => ({
  type: STUDENT_LOGIN,
  payload
})

export const adminLogin = payload => ({
  type: ADMIN_LOGIN,
  payload
})

export const professorLogin = payload => ({
  type: PROFESSOR_LOGIN,
  payload
})

export const logout = () => ({
  type: LOGOUT
})

export default {
  STUDENT_LOGIN,
  ADMIN_LOGIN,
  PROFESSOR_LOGIN,
  LOGOUT
}
