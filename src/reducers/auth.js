import Actions from '../actions/auth'

export const initialState = {
  id: null,
  info: {},
  userType: null, // -> 'STUDENT' || 'ADMIN' || 'PROFESSOR'
  isVerified: false
}

export function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case Actions.STUDENT_LOGIN:
      return {
        ...state,
        id: payload.id,
        info: {
          email: payload.credentials.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          studentNumber: payload.studentNumber,
          specialization: payload.specialization
        },
        userType: payload.type,
        isVerified: payload.credentials.isVerified
      }
    case Actions.PROFESSOR_LOGIN:
      return {
        ...state,
        id: payload.id,
        info: {
          email: payload.credentials.email,
          firstName: payload.firstName,
          lastName: payload.lastName
        },
        userType: payload.type,
        isVerified: payload.credentials.isVerified
      }
    case Actions.ADMIN_LOGIN:
      return {
        ...state,
        id: payload.id,
        info: {
          email: payload.credentials.email
        },
        userType: payload.type,
        isVerified: payload.credentials.isVerified
      }
    case Actions.LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
