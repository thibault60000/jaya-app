import { connect } from 'react-redux'
import { SideBar } from '../../components/index'
import { logout } from '../../actions/auth'
import { push } from 'react-router-redux'

export default connect(
  state => ({
    userType: state.auth.userType
  }),
  dispatch => ({
    onDisconnectClick: () => {
      dispatch(logout())
      dispatch(push('/'))
    }
  })
)(SideBar)
