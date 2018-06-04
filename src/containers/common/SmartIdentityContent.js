import { connect } from 'react-redux'
import { IdentityContent } from '../../components/index'

export default connect(
  state => ({
    userType: state.auth.userType,
    userInfo: state.auth.info
  }),
  {}
)(IdentityContent)
