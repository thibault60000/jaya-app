import React from 'react'
import PropTypes from 'prop-types'

import { AlgorithmForm } from '../../components'
import { makeQuery } from '../../services/data-service'

class SmartAlgorithmForm extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onSuccess: () => {}
  }

  state = {
    loading: false,
    schoolYear: {
      value: null,
      error: null
    },
    semester: {
      value: 'SEMESTER_1',
      error: null
    },
    error: null
  }

  render () {
    const { schoolYear, semester, loading, error } = this.state

    return (
      <AlgorithmForm
        schoolYear={schoolYear}
        semester={semester}
        loading={loading}
        error={error}
        onChange={this._onChange}
        onFormSubmit={this._onFormSubmit}
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

  _onFormSubmit = evt => {
    evt.preventDefault()

    const { schoolYear, semester } = this.state

    const query = `
      mutation {
        runAlgorithm(params: {
          schoolYearId: ${schoolYear.value.id}
          semester: ${semester.value}
        }) {
          id
        }
      }
    `

    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(() => {
        this.setState({ loading: false }, this.props.onSuccess)
      })
      .catch((e) => {
        window.alert(`L'algorithme ne n'est pas exécuté correctement. Veuillez réessayer.`)
        console.error(e)
      })
  }
}

export default SmartAlgorithmForm
