import Actions from '../actions/global'

export const initialState = {
  appReady: false
}

export function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case Actions.APP_READY:
      return {
        ...state,
        appReady: true
      }
    default:
      return state
  }
}
