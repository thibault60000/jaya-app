import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StudentRegisterForm } from '../../components/index'
import { registerStudent } from '../../services/user-service'
import { studentLogin } from '../../actions/auth'
import { push } from 'react-router-redux'

class SmartStudentRegisterForm extends React.Component {
  static propTypes = {
    onLoginSuccess: PropTypes.func.isRequired
  };

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    studentNumber: '',
    specialization: null,
    loading: false,
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      studentNumber: null,
      specialization: null
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
      password,
      studentNumber,
      specialization
    } = this.state

    this.setState({
      ...this.state,
      loading: true
    })

    registerStudent(email, password, firstName, lastName, studentNumber, specialization.id)
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
      studentNumber,
      specialization,
      errors,
      loading
    } = this.state

    return (
      <StudentRegisterForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        studentNumber={studentNumber}
        specialization={specialization}
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
      dispatch(studentLogin(data))
      dispatch(push('/student/home'))
    }
  })
)(SmartStudentRegisterForm)
