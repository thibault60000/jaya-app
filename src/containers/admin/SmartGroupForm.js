import React from 'react'
import PropTypes from 'prop-types'

import { GroupForm } from '../../components'
import { makeQuery } from '../../services/data-service'

class SmartGroupForm extends React.Component {
  static propTypes = {
    group: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.oneOf(['LECTURE', 'TUTORIAL']),
      subject: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string
      }),
      students: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    modify: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    onSuccess: () => {},
    onCancel: () => {}
  }

  state = {
    label: {
      value: '',
      error: null
    },
    type: {
      value: 'LECTURE',
      error: null
    },
    subject: {
      value: null,
      error: null
    },
    remainingStudents: [],
    groupStudents: [],
    loading: false,
    error: null
  }

  componentDidMount () {
    const { group } = this.props

    if (group) {
      this._setUpExistingGroup()
    }
  }

  render () {
    const {
      label,
      type,
      subject,
      loading,
      error,
      remainingStudents,
      groupStudents
    } = this.state

    const { onCancel, modify } = this.props

    return (
      <GroupForm
        modify={modify}
        remainingStudents={remainingStudents}
        groupStudents={groupStudents}
        label={label}
        type={type}
        subject={subject}
        loading={loading}
        error={error}
        onDragStudent={this._onDrag}
        onDropStudent={this._onDrop}
        onChange={this._onChange}
        onFormSubmit={this._onSubmit}
        onCancel={onCancel}
      />
    )
  }

  _onSubmit = evt => {
    evt.preventDefault()
    const { onSuccess, group } = this.props
    const {
      label,
      type,
      subject,
      groupStudents
    } = this.state
    let query

    if (group) {
      query = `
        mutation {
          updateGroup(
            id: ${group.id}
            type: ${type.value}
            label: "${label.value}"
            subjectId: ${subject.value.id}
            studentIds: [${groupStudents.map(s => `${s.id} `)}]
          ) {
            id
          }
        }
      `
    } else {
      query = `
        mutation {
          createGroup(
            type: ${type.value}
            label: "${label.value}"
            subjectId: ${subject.value.id}
            studentIds: [${groupStudents.map(s => `${s.id} `)}]
          ) {
            id
          }
        }
      `
    }

    makeQuery({ query, withAuthorization: true })
      .then(() => onSuccess())
      .catch(e => {
        console.error(e)
        window.alert('Impossible de gérer le groupe. Une erreur est survenue.')
      })
  }

  _onChange = evt => {
    const { name, value } = evt.target

    switch (name) {
      case 'subject':
        this._loadStudent(value.id)
    }

    this.setState({
      [name]: {
        value,
        error: null
      }
    })
  }

  _loadStudent = subjectId => {
    const query = `
      query {
        studentsBySubject(subjectId: "${subjectId}", withoutGroupStudent: false) {
          id
          firstName
          lastName
          specialization {
            label
          }
        }
      }
    `
    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(students => {
        this.setState({
          loading: false,
          remainingStudents: students,
          groupStudents: []
        })
      })
  }

  _onDrag = (evt, student) => {
    evt.dataTransfer.setData('student', student.id)
  }

  _onDrop = evt => {
    const { remainingStudents, groupStudents } = this.state

    const studentId = evt.dataTransfer.getData('student')
    const remainingStudentsIds = remainingStudents.map(s => s.id)

    if (remainingStudentsIds.includes(studentId)) {
      const student = remainingStudents.find(std => std.id === studentId)
      this.setState({
        remainingStudents: this.state.remainingStudents.filter(s => s.id !== studentId),
        groupStudents: [...this.state.groupStudents, student]
      })
    } else {
      const student = groupStudents.find(std => std.id === studentId)
      this.setState({
        groupStudents: this.state.groupStudents.filter(s => s.id !== studentId),
        remainingStudents: [...this.state.remainingStudents, student]
      })
    }
  }

  _setUpExistingGroup = () => {
    const { label, subject, students, type } = this.props.group
    const query = `
      query {
        studentsBySubject(subjectId: "${subject.id}", withoutGroupStudent: false) {
          id
          firstName
          lastName
          specialization {
            label
          }
        }
      }
    `

    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(s => {
        this.setState({
          remainingStudents: s.filter(std => !students.map(x => x.id).includes(std.id)),
          groupStudents: s.filter(std => students.map(x => x.id).includes(std.id)),
          label: {
            value: label,
            error: null
          },
          type: {
            value: type,
            error: null
          },
          subject: {
            value: {
              id: subject.id,
              label: subject.label
            },
            error: null
          },
          loading: false
        })
      })
  }
}

export default SmartGroupForm
