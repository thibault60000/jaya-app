import { DATA_API_URL, getAuthenticatedHttpHeaders, getHttpHeaders } from '../settings'
import Axios from 'axios'

const GRAPHQL_URL = `${DATA_API_URL}/graphql?`

/**
 * Make a GraphQL Query to the specified
 *
 * @returns {Promise<Object>} Data from GraphQL according to the query
 */
export function makeQuery ({ query, withAuthorization = false }) {
  return Axios.post(
    GRAPHQL_URL,
    { query },
    { headers: withAuthorization ? getAuthenticatedHttpHeaders() : getHttpHeaders() })
    .then(({ data }) => {
      const result = data.data
      if (data.errors) {
        throw new Error('Error GRAPHQL')
      }
      return result[Object.keys(result)[0]]
    })
}
