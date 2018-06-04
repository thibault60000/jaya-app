import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import { SpecializationSkillForm } from '../../components'
import { makeQuery } from '../../services/data-service'

class SmartSpecializationSkillForm extends React.Component {
  static propTypes = {
    specializationSkillsId: PropTypes.arrayOf(PropTypes.string),
    specialization: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    }),
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    skills: {
      value: {
        skill1: {
          skill: null,
          optionalSubjectsNb: 0
        }
      }
    },
    loading: false
  }

  render () {
    const { skills, loading } = this.state
    const { onCancel, specializationSkillsId } = this.props
    return (
      <SpecializationSkillForm
        specializationSkillsId={specializationSkillsId}
        skills={skills}
        loading={loading}
        onChange={this._onChange}
        onFormSubmit={this._onSubmit}
        onAddSkillClick={this._addSkillClick}
        onRemoveSkillClick={this._onRemoveSkillClick}
        onCancel={onCancel}
      />
    )
  }

  _onSubmit = (evt) => {
    evt.preventDefault()

    const { skills } = this.state
    const { specialization, onSuccess } = this.props

    const formattedSkills = map(skills.value, ({ skill, optionalSubjectsNb }) => {
      return {
        skillId: skill.id,
        optionalSubjectsNb
      }
    })

    const addSkillsQuery = `
      mutation {
        addSkillToSpecialization (
          specializationId: ${specialization.id},
          skills: [${formattedSkills.map(fs => `{skillId: "${fs.skillId}", optionalSubjectsNb: ${fs.optionalSubjectsNb}}`)}]
        ) {
          skill { id label }
        }
      }
    `

    this.setState({ loading: true })

    makeQuery({ query: addSkillsQuery, withAuthorization: true })
      .then(() => {
        onSuccess()
      })
      .catch(() => {
        window.alert('Une erreur est survenue. Veuillez réessayer.')
        this.setState({ loading: false })
      })
  }

  _onChange = ({ target }) => {
    const { error } = target

    this.setState({
      skills: {
        value: {
          ...this.state.skills.value,
          [`${target.key}`]: {
            ...this.state.skills.value[`${target.key}`],
            [`${target.value.name}`]: target.value.data
          }
        },
        error
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

  _onRemoveSkillClick = identifier => {
    const skillsNb = Object.keys(this.state.skills.value).length

    if (skillsNb > 1) {
      let skillForms = {}
      let count = 1

      map({ ...this.state.skills.value }, (value, key) => {
        if (key !== `skill${identifier}`) {
          skillForms = {
            ...skillForms,
            [`skill${count}`]: { ...value }
          }
        }
        ++count
      })

      this.setState({
        skills: {
          value: skillForms,
          error: null
        }
      })
    }
  }
}

export default SmartSpecializationSkillForm
