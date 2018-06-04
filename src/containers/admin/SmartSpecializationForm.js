import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import { SpecializationForm } from '../../components'
import { makeQuery } from '../../services/data-service'

class SmartSpecializationForm extends React.Component {
  static propTypes = {
    specialization: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      acronym: PropTypes.string,
      schoolYear: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string
      }),
      openingChoiceDateS1: PropTypes.string,
      closingChoiceDateS1: PropTypes.string,
      openingChoiceDateS2: PropTypes.string,
      closingChoiceDateS2: PropTypes.string
    }),
    specializationSubjects: PropTypes.arrayOf(
      PropTypes.shape({
        subject: PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string
        }),
        skill: PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string
        }),
        isOptional: PropTypes.bool
      })
    ),
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    label: {
      value: '',
      error: null
    },
    acronym: {
      value: '',
      error: null
    },
    schoolYear: {
      value: null,
      error: null
    },
    openingChoiceDateS1: {
      value: '',
      error: null
    },
    closingChoiceDateS1: {
      value: '',
      error: null
    },
    openingChoiceDateS2: {
      value: '',
      error: null
    },
    closingChoiceDateS2: {
      value: '',
      error: null
    },
    subjects: {
      value: {},
      error: null
    },
    skills: {
      value: {},
      error: null
    },
    loading: false
  }

  _setDefaultSpecialization = () => {
    const { specialization } = this.props
    if (specialization != null) {
      this.setState({
        label: {
          value: specialization.label,
          error: null
        },
        acronym: {
          value: specialization.acronym,
          error: null
        },
        schoolYear: {
          value: {
            id: specialization.schoolYear.id,
            label: specialization.schoolYear.label
          },
          error: null
        },
        openingChoiceDateS1: {
          value: specialization.openingChoiceDateS1,
          error: null
        },
        closingChoiceDateS1: {
          value: specialization.closingChoiceDateS1,
          error: null
        },
        openingChoiceDateS2: {
          value: specialization.openingChoiceDateS2,
          error: null
        },
        closingChoiceDateS2: {
          value: specialization.closingChoiceDateS2,
          error: null
        }
      })
    }
  }

  _onChange = ({ target }) => {
    const { name, value, error } = target

    console.log(value)

    // TODO: Form validators here
    if (name !== 'subjects' && name !== 'skills') {
      switch (name) {
        case 'label':
          break
        case 'acronym':
          break
        case 'schoolYear':
          break
        case 'openingChoiceDateS1':
          break
        case 'closingChoiceDateS1':
          break
        case 'openingChoiceDateS2':
          break
        case 'closingChoiceDateS2':
          break
      }

      this.setState({
        [name]: {
          value,
          error
        }
      })
    } else {
      this.setState({
        [name]: {
          value: {
            ...this.state[name].value,
            [`${target.key}`]: {
              ...this.state[name].value[`${target.key}`],
              [`${target.value.name}`]: target.value.data
            }
          },
          error
        }
      })
    }
  }

  _onSubmit = (event) => {
    event.preventDefault()
    const { specialization, onSuccess } = this.props
    const {
      label,
      acronym,
      schoolYear,
      subjects,
      skills,
      openingChoiceDateS1,
      closingChoiceDateS1,
      openingChoiceDateS2,
      closingChoiceDateS2
    } = this.state

    const formattedSubjects = map(subjects.value, ({ skill, subject, ...others }) => {
      return {
        skillId: skill.id,
        subjectId: subject.id,
        ...others
      }
    })

    const formattedSkills = map(skills.value, ({ skill, optionalSubjectsNb }) => {
      return {
        skillId: skill.id,
        optionalSubjectsNb
      }
    })

    if (specialization != null) {
      const updateSpecializationQuery = `
        mutation {
          updateSpecialization(
            id: "${specialization.id}"
            label: "${label.value}"
            acronym: "${acronym.value}"
            schoolYearId: "${schoolYear.value.id}"
            openingChoiceDateS1: "${openingChoiceDateS1.value}"
            closingChoiceDateS1: "${closingChoiceDateS1.value}"
            openingChoiceDateS2: "${openingChoiceDateS2.value}"
            closingChoiceDateS2: "${closingChoiceDateS2.value}"
          ) {
            id
            label
            acronym
            schoolYear {
              id
              label
            }
          }
        }
      `
      this.setState({ loading: true })

      makeQuery({ query: updateSpecializationQuery, withAuthorization: true })
        .then(() => onSuccess())
        .catch(() => this.setState({ loading: false }))
    } else {
      const createSpecializationQuery = `
        mutation {
          createSpecialization(
            label: "${label.value}"
            acronym: "${acronym.value}"
            schoolYearId: "${schoolYear.value.id}"
            openingChoiceDateS1: "${openingChoiceDateS1.value}"
            closingChoiceDateS1: "${closingChoiceDateS1.value}"
            openingChoiceDateS2: "${openingChoiceDateS2.value}"
            closingChoiceDateS2: "${closingChoiceDateS2.value}"
          ) {
            id
            label
            acronym
            schoolYear {
              id
              label
            }
          }
        }
      `

      const addSubjectsQuery = (id) => `
        mutation {
          addSubjectsToSpecialization (
            specializationId: ${id},
            subjects: [${formattedSubjects.map(fs => `{subjectId: "${fs.subjectId}", skillId: "${fs.skillId}", isOptional: ${fs.isOptional}}`)}]
          ) {
            subject { id label }
          }
        }
      `

      const addSkillsInfoQuery = (id) => `
        mutation {
          addSkillToSpecialization (
            specializationId: ${id},
            skills: [${formattedSkills.map(fs => `{skillId: "${fs.skillId}", optionalSubjectsNb: ${fs.optionalSubjectsNb}}`)}]
          ) {
            skill { id label }
          }
        }
      `
      this.setState({ loading: true })

      makeQuery({ query: createSpecializationQuery, withAuthorization: true })
        .then(({ id }) => Promise.all([
          makeQuery({ query: addSubjectsQuery(id), withAuthorization: true }),
          makeQuery({ query: addSkillsInfoQuery(id), withAuthorization: true })
        ]))
        .then(() => onSuccess())
        .catch(() => this.setState({ loading: false }))
    }
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

  _onRemoveSubjectClick = (key) => {
    const subjectsForms = { ...this.state.subjects.value }
    delete subjectsForms[key]

    this.setState({
      subjects: {
        value: subjectsForms,
        error: this.state.subjects.error != null && this.state.subjects.error.key === key ? null : this.state.subjects.error
      }
    })
  }

  _addSkillClick = () => {
    const skillsNb = Object.keys(this.state.skills.value).length
    this.setState({
      skills: {
        ...this.state.skills,
        value: {
          ...this.state.skills.value,
          [`skill${skillsNb + 1}`]: {
            skill: null,
            optionalSubjectsNb: 0
          }
        }
      }
    })
  }

  _onRemoveSkillClick = (key) => {
    const skillForms = { ...this.state.skills.value }
    delete skillForms[key]

    this.setState({
      skills: {
        value: skillForms,
        error: null
      }
    })
  }

  componentDidMount () {
    this._setDefaultSpecialization()
  }

  render () {
    const { specialization, onCancel } = this.props
    const {
      label,
      acronym,
      schoolYear,
      subjects,
      skills,
      openingChoiceDateS1,
      closingChoiceDateS1,
      openingChoiceDateS2,
      closingChoiceDateS2
    } = this.state

    return (
      <SpecializationForm
        modify={specialization != null}
        label={label}
        acronym={acronym}
        schoolYear={schoolYear}
        openingChoiceDateS1={openingChoiceDateS1}
        closingChoiceDateS1={closingChoiceDateS1}
        openingChoiceDateS2={openingChoiceDateS2}
        closingChoiceDateS2={closingChoiceDateS2}
        subjects={subjects}
        skills={skills}
        onChange={this._onChange}
        onFormSubmit={this._onSubmit}
        onAddSubjectClick={this._onAddSubjectClick}
        onRemoveSubjectClick={this._onRemoveSubjectClick}
        onAddSkillClick={this._addSkillClick}
        onRemoveSkillClick={this._onRemoveSkillClick}
        onCancel={onCancel}
      />
    )
  }
}

export default SmartSpecializationForm
