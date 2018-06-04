import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProfessorRegisterForm } from '../../components/index'
import { registerProfessor } from '../../services/user-service'
import { professorLogin } from '../../actions/auth'
import { push } from 'react-router-redux'

class SmartProfessorRegisterForm extends React.Component {
  static propTypes = {
    onLoginSuccess: PropTypes.func.isRequired
  };

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    loading: false,
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  };

  _onChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      ...this.state,
      [`${name}`]: value
    })
  };

  _onSubmit = (event) => {
    event.preventDefault()
    const {
      firstName,
      lastName,
      email,
      password
    } = this.state

    this.setState({
      ...this.state,
      loading: true
    })

    registerProfessor(email, password, firstName, lastName)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          loading: false
        })
        this.props.onLoginSuccess(data.data)
      })
      .catch((e) => {
        console.log(e)
        this.setState({
          ...this.state,
          loading: false
        })
        window.alert('Erreur, impossible de se connecter')
      })
  };

  render () {
    const {
      firstName,
      lastName,
      email,
      password,
      errors,
      loading
    } = this.state

    return (
      <ProfessorRegisterForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        errors={errors}
        onChange={this._onChange}
        onSubmit={this._onSubmit}
        loading={loading}
      />
    )
  }
}

export default connect(
  null,
  dispatch => ({
    onLoginSuccess: (data) => {
      dispatch(professorLogin(data))
      dispatch(push('/professor/home'))
    }
  })
)(SmartProfessorRegisterForm)
