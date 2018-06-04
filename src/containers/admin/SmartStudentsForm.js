import React from 'react'
import PropTypes from 'prop-types'

import { StudentForm } from '../../components'
import { makeQuery } from '../../services/data-service'
import { adminSetPassword } from '../../services/user-service'

class SmartStudentsForm extends React.Component {
  static propTypes = {
    student: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      studentNumber: PropTypes.string,
      credentials: PropTypes.shape({
        id: PropTypes.string,
        email: PropTypes.string
      }),
      specialization: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.label
      })
    }),
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    firstName: {
      value: '',
      error: null
    },
    lastName: {
      value: '',
      error: null
    },
    email: {
      value: '',
      error: null
    },
    studentNumber: {
      value: '',
      error: null
    },
    password: {
      value: '',
      error: null
    },
    specialization: {
      value: null,
      error: null
    },
    loading: false,
    error: null
  }

  componentDidMount () {
    if (this.props.student != null) {
      this._setStudent()
    }
  }

  render () {
    const {
      firstName,
      lastName,
      studentNumber,
      email,
      password,
      specialization,
      loading,
      error
    } = this.state

    const {
      onCancel,
      student
    } = this.props

    return (
      <StudentForm
        modify={student != null}
        firstName={firstName}
        lastName={lastName}
        studentNumber={studentNumber}
        email={email}
        password={password}
        specialization={specialization}
        loading={loading}
        error={error}
        onChange={this._onChange}
        onFormSubmit={this._onSubmit}
        onCancel={onCancel}
      />
    )
  }

  _onChange = evt => {
    const { name, value } = evt.target

    this.setState({
      [name]: {
        value,
        error: null
      }
    })
  }

  _onSubmit = evt => {
    evt.preventDefault()
    const { student, onSuccess } = this.props
    const {
      firstName,
      lastName,
      studentNumber,
      email,
      password,
      specialization
    } = this.state

    if (student) {
      const query = `
        mutation {
          updateStudent (
            id: "${student.id}"
            email: "${email.value}"
            firstName: "${firstName.value}"
            lastName: "${lastName.value}"
            studentNumber: "${studentNumber.value}"
            specializationId: "${specialization.value.id}"
          ) {
            id
          }
        }
      `
      this.setState({ loading: true })

      makeQuery({ query, withAuthorization: true })
        .then(() => onSuccess())
        .catch(e => {
          console.error(e)
          window.alert('Impossible de modifier l\'utilisateur.')
        })
    } else {
      const query = `
        mutation {
          createStudent (
            email: "${email.value}"
            password: "NOT_A_PASSWORD"
            firstName: "${firstName.value}"
            lastName: "${lastName.value}"
            studentNumber: "${studentNumber.value}"
            specializationId: "${specialization.value.id}"
          ) {
            credentials { id }
          }
        }
      `

      this.setState({ loading: true })

      makeQuery({ query })
        .then(student => {
          return adminSetPassword(student.credentials.id, password.value)
        })
        .then(() => {
          onSuccess()
        })
        .catch(e => {
          console.error(e)
          window.alert('Impossible de créer un utilisateur.')
        })
    }
  }

  _setStudent = () => {
    const {
      firstName,
      lastName,
      studentNumber,
      credentials,
      specialization
    } = this.props.student

    this.setState({
      firstName: {
        value: firstName,
        error: null
      },
      lastName: {
        value: lastName,
        error: null
      },
      email: {
        value: credentials.email,
        error: null
      },
      studentNumber: {
        value: studentNumber,
        error: null
      },
      specialization: {
        value: {
          id: specialization.id,
          label: specialization.label
        },
        error: null
      }
    })
  }
}

export default SmartStudentsForm
