import Environment from './environment'

export const JAYA_LOCAL_KEY = 'jaya_app_miage'

export const DATA_API_URL = Environment.development ? 'http://localhost:4000' : 'https://iqxf5egywf.execute-api.us-east-1.amazonaws.com/v1'
export const USER_API_URL = Environment.development ? 'http://localhost:4001' : 'https://bqwamw7fge.execute-api.us-east-1.amazonaws.com/v1'

const BASE_HEADERS = {
  'Content-Type': 'application/json'
}

export function getHttpHeaders () {
  return { ...BASE_HEADERS }
}

export function getAuthenticatedHttpHeaders () {
  let token = window.localStorage.getItem(JAYA_LOCAL_KEY)
  if (token != null) {
    return {
      ...BASE_HEADERS,
      'Authorization': `Bearer ${token}`
    }
  } else {
    throw new Error('TOKEN DOES NOT EXISTS')
  }
}
