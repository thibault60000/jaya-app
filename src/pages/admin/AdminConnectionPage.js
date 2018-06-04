import React from 'react'
import PropTypes from 'prop-types'
import { ConnectionForm } from '../../components/index'
import { loginAdmin } from '../../services/user-service'
import { connect } from 'react-redux'
import { adminLogin } from '../../actions/auth'
import { push } from 'react-router-redux'

import logo from '../../assets/img/logo.png'
import jaya from '../../assets/img/jayalogo.png'

class AdminConnectionPage extends React.Component {
  static propTypes = {
    onLoginSuccess: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    email: '',
    password: ''
  };

  _onSubmitForm = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    const { onLoginSuccess } = this.props

    this.setState({
      ...this.state,
      loading: true
    })

    loginAdmin(email, password)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          loading: false
        })

        onLoginSuccess(data.data)
      })
      .catch((e) => {
        console.error(e)
        this.setState({
          ...this.state,
          loading: false
        })
        window.alert('Utilisateur incorrect')
      })
  };

  _onChangeFormValue = ({ target }) => {
    const { name, value } = target
    this.setState({
      ...this.state,
      [`${name}`]: value
    })
  };

  render () {
    const { loading, email, password } = this.state

    return (
      <section className='connexion'>
        <div className='Logos'>
          <img src={logo} className='logoJaya' alt='Logo Jaya' />
          <img src={jaya} className='logoJaya2' alt='Jaya' />
        </div>

        <h4 className='title is-4 has-text-centered has-text-white titleConnexion'>Espace administrateur :</h4>

        <ConnectionForm
          loading={loading}
          onSubmit={this._onSubmitForm}
          onChange={this._onChangeFormValue}
          email={email}
          password={password}
        />

        <div className='signInLinks'>
          <a href='#' aria-label='mot de passe oublié'>Mot de passe oublié </a>
        </div>
      </section>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    onLoginSuccess: (data) => {
      dispatch(adminLogin(data))
      dispatch(push('/admin/home'))
    }
  })
)(AdminConnectionPage)
