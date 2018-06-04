import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { logout } from '../../actions/auth'

const SmartLogoutButton = connect(
  null,
  (dispatch) => ({
    onClick: () => {
      dispatch(push('/'))
      dispatch(logout())
    }
  })
)(({ onClick }) => (
  <button
    onClick={onClick}
    className='button is-primary'
  >
    Deconnexion
  </button>
))

export default SmartLogoutButton
