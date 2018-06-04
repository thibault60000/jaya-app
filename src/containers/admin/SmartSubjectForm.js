import React from 'react'
import PropTypes from 'prop-types'
import { SubjectForm } from '../../components'
import { makeQuery } from '../../services/data-service'

class SmartSubjectForm extends React.Component {
  static propTypes = {
    subject: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      apogeeCode: PropTypes.string,
      description: PropTypes.string,
      capacity: PropTypes.number,
      semester: PropTypes.oneOf(['SEMESTER_1', 'SEMESTER_2', 'ANNUAL'])
    }),
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    label: {
      value: '',
      error: null
    },
    apogeeCode: {
      value: '',
      error: null
    },
    description: {
      value: '',
      error: null
    },
    capacity: {
      value: 0,
      error: null
    },
    semester: {
      value: 'SEMESTER_1',
      error: null
    },
    loading: false
  }

  _setDefaultSubject = () => {
    const { subject } = this.props
    if (subject != null) {
      this.setState({
        label: {
          value: subject.label,
          error: null
        },
        apogeeCode: {
          value: subject.apogeeCode,
          error: null
        },
        description: {
          value: subject.description,
          error: null
        },
        capacity: {
          value: subject.capacity,
          error: null
        },
        semester: {
          value: subject.semester,
          error: null
        }
      })
    }
  }

  _onChange = ({ target }) => {
    const { name, value } = target
    let error = null

    // TODO: Form validators here
    switch (name) {
      case 'label':
        break
      case 'apogeeCode':
        break
      case 'description':
        break
      case 'capacity':
        break
      case 'semester':
        break
    }

    this.setState({
      [`${name}`]: {
        value,
        error
      }
    })
  }

  _onSubmit = (event) => {
    event.preventDefault()
    const { subject, onSuccess } = this.props
    const { label, description, apogeeCode, capacity, semester } = this.state
    let query

    if (subject != null) {
      query = `
        mutation {
          updateSubject(
            id: "${subject.id}"
            label: "${label.value}"
            apogeeCode: "${apogeeCode.value}"
            description: "${description.value}"
            capacity: ${capacity.value}
            semester: ${semester.value}
          ) {
            id
          } 
        }
      `
    } else {
      query = `
        mutation {        
          createSubject(
            label: "${label.value}"
            apogeeCode: "${apogeeCode.value}"
            description: "${description.value}"
            capacity: ${capacity.value}
            semester: ${semester.value}
          ){
            id
          }
        }
      `
    }

    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(() => onSuccess())
      .catch(() => this.setState({ loading: false }))
  }

  componentDidMount () {
    this._setDefaultSubject()
  }

  render () {
    const { subject, onCancel } = this.props
    const { label, apogeeCode, description, capacity, semester } = this.state

    return (
      <SubjectForm
        modify={subject != null}
        label={label}
        apogeeCode={apogeeCode}
        description={description}
        capacity={capacity}
        semester={semester}
        onChange={this._onChange}
        onFormSubmit={this._onSubmit}
        onCancel={onCancel}
      />
    )
  }
}

export default SmartSubjectForm
