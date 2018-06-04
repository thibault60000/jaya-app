import React from 'react'
import PropTypes from 'prop-types'

import { ProfessorForm } from '../../components'
import { makeQuery } from '../../services/data-service'
import { adminSetPassword } from '../../services/user-service'

class SmartProfessorForm extends React.Component {
  static propTypes = {
    professor: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      credentials: PropTypes.shape({
        id: PropTypes.string,
        email: PropTypes.string
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
    password: {
      value: '',
      error: null
    },
    loading: false,
    error: null
  }

  componentDidMount () {
    if (this.props.professor != null) {
      this._setProfessor()
    }
  }

  render () {
    const {
      firstName,
      lastName,
      email,
      password,
      loading,
      error
    } = this.state

    const {
      onCancel,
      professor
    } = this.props

    return (
      <ProfessorForm
        modify={professor != null}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        loading={loading}
        error={error}
        onChange={this._onChange}
        onFormSubmit={this._onSubmit}
        onCancel={onCancel}
      />
    )
  }

  _onChange = evt => {
    console.log('HERE')
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
    const { professor, onSuccess } = this.props
    const {
      firstName,
      lastName,
      email,
      password
    } = this.state

    if (professor) {
      const query = `
        mutation {
          updateProfessor (
            id: "${professor.id}"
            email: "${email.value}"
            firstName: "${firstName.value}"
            lastName: "${lastName.value}"
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
          createProfessor (
            email: "${email.value}"
            password: "NOT_A_PASSWORD"
            firstName: "${firstName.value}"
            lastName: "${lastName.value}"
          ) {
            credentials { id }
          }
        }
      `

      this.setState({ loading: true })

      makeQuery({ query })
        .then(professor => {
          return adminSetPassword(professor.credentials.id, password.value)
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

  _setProfessor = () => {
    const {
      firstName,
      lastName,
      credentials
    } = this.props.professor

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
      }
    })
  }
}

export default SmartProfessorForm
