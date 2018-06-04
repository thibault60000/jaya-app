import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import { SpecializationSubjectForm } from '../../components'
import { makeQuery } from '../../services/data-service'

class SmartSpecializationSubjectForm extends React.Component {
  static propTypes = {
    specializationSubjectsId: PropTypes.arrayOf(PropTypes.string),
    specialization: PropTypes.shape(),
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    subjects: {
      value: {
        subject1: {
          skill: null,
          subject: null,
          isOptional: false
        }
      },
      error: null
    },
    loading: false
  }

  render () {
    const { subjects, loading } = this.state
    const { onCancel, specializationSubjectsId } = this.props

    return (
      <SpecializationSubjectForm
        specializationSubjectsId={specializationSubjectsId}
        onFormSubmit={this._onSubmit}
        loading={loading}
        subjects={subjects}
        onChange={this._onChange}
        onAddSubjectClick={this._onAddSubjectClick}
        onRemoveSubjectClick={this._onRemoveSubjectClick}
        onCancel={onCancel}
      />
    )
  }

  _onSubmit = (evt) => {
    evt.preventDefault()

    const { subjects } = this.state
    const { specialization, onSuccess } = this.props

    const formattedSubjects = map(subjects.value, ({ skill, subject, ...others }) => {
      return {
        skillId: skill.id,
        subjectId: subject.id,
        ...others
      }
    })

    const addSubjectsQuery = `
      mutation {
        addSubjectsToSpecialization (
          specializationId: ${specialization.id},
          subjects: [${formattedSubjects.map(fs => `{subjectId: "${fs.subjectId}", skillId: "${fs.skillId}", isOptional: ${fs.isOptional}},`)}]
        ) {
          subject { id label }
        }
      }
    `
    this.setState({ loading: true })

    makeQuery({ query: addSubjectsQuery, withAuthorization: true })
      .then(() => onSuccess())
      .catch(() => this.setState({ loading: false }))
  }

  _onChange = ({ target }) => {
    const { error } = target

    this.setState({
      subjects: {
        value: {
          ...this.state.subjects.value,
          [`${target.key}`]: {
            ...this.state.subjects.value[`${target.key}`],
            [`${target.value.name}`]: target.value.data
          }
        },
        error
      }
    })
  }

  _onAddSubjectClick = () => {
    const subjectsNb = Object.keys(this.state.subjects.value).length
    this.setState({
      subjects: {
        ...this.state.subjects,
        value: {
          ...this.state.subjects.value,
          [`subject${subjectsNb + 1}`]: {
            skill: null,
            subject: null,
            isOptional: false
          }
        }
      }
    })
  }

  _onRemoveSubjectClick = identifier => {
    const subjectsNb = Object.keys(this.state.subjects.value).length

    if (subjectsNb > 1) {
      let subjectsForm = {}
      let count = 1

      map({ ...this.state.subjects.value }, (value, key) => {
        if (key !== `skill${identifier}`) {
          subjectsForm = {
            ...subjectsForm,
            [`skill${count}`]: { ...value }
          }
        }
        ++count
      })

      this.setState({
        subjects: {
          value: subjectsForm,
          error: this.state.subjects.error != null && this.state.subjects.error.key === identifier ? null : this.state.subjects.error
        }
      })
    }
  }
}

export default SmartSpecializationSubjectForm
