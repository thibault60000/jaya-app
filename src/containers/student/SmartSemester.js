import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeQuery } from '../../services/data-service'

import { Loading, Semester } from '../../components'

class SmartSemester extends React.Component {
  static propTypes = {
    userSpecializationId: PropTypes.string,
    specializationSemester: PropTypes.string
  }

  state = {
    specialization: null,
    skills: null,
    loading: true
  }

  componentDidMount () {
    this._updateSemester()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.specializationSemester !== this.props.specializationSemester && this.props.specializationSemester != null) {
      this._updateSemester()
    }
  }

  render () {
    const { mandatories, optionals, specialization, loading } = this.state

    return (
      <div>
        { loading ? (<Loading />) : (
          <Semester
            specialization={specialization}
            optionals={optionals}
            mandatories={mandatories}
          />
        )}
      </div>
    )
  }

  _updateSemester = () => {
    const { userSpecializationId } = this.props

    const specializationQuery = makeQuery({
      query: `
        query {
          specializationById (id: "${userSpecializationId}") {
            id
            label
            schoolYear {
              id
              label
            }
          }
        }
      `
    })

    const specializationSubjectsQuery = makeQuery({
      query: `
        query {
          getSpecializationSubjectBySpecializationId(id: "${userSpecializationId}") {
            subject { id label description semester }
            skill { id label }
            isOptional
          }
        }
      `
    })

    Promise.all([ specializationQuery, specializationSubjectsQuery ])
      .then(this._transformDataIntoStateProps)
  }

  _transformDataIntoStateProps = ([ specialization, specializationSubject ]) => {
    const { specializationSemester } = this.props

    const { mandatories, optionals } = specializationSubject.reduce(({ mandatories, optionals }, { subject, skill, isOptional }) => {
      if (subject.semester !== specializationSemester) {
        return { mandatories, optionals }
      }

      if (isOptional) {
        const skillIndex = optionals.map(s => s.id).indexOf(skill.id)
        if (skillIndex === -1) {
          optionals.push({
            ...skill,
            subjects: [ subject ]
          })
        } else {
          optionals[skillIndex].subjects.push(subject)
        }
      } else {
        const skillIndex = mandatories.map(s => s.id).indexOf(skill.id)
        if (skillIndex === -1) {
          mandatories.push({
            ...skill,
            subjects: [ subject ]
          })
        } else {
          mandatories[skillIndex].subjects.push(subject)
        }
      }

      return { mandatories, optionals }
    }, { mandatories: [], optionals: [] })

    this.setState({ mandatories, optionals, specialization, loading: false })
  }
}

export default connect(
  ({ auth }) => ({
    userSpecializationId: auth.info.specialization.id
  }),
  null
)(SmartSemester)
