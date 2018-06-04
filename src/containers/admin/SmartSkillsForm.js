import React from 'react'
import PropTypes from 'prop-types'
import { SkillForm } from '../../components'
import { makeQuery } from '../../services/data-service'

class SmartSkillsForm extends React.Component {
  static propTypes = {
    skill: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    }),
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func
  }

  state = {
    label: {
      value: '',
      error: null
    },
    loading: false
  }

  _setDefaultSkill = () => {
    const { skill } = this.props
    if (skill != null) {
      this.setState({
        label: {
          value: skill.label,
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
    const { skill, onSuccess } = this.props
    const { label } = this.state
    let query

    if (skill != null) {
      query = `
        mutation {
          updateSkill(
            id: "${skill.id}"
            label: "${label.value}"
          ) {
            id
            label
          } 
        }
      `
    } else {
      query = `
        mutation {        
          createSkill(
            label: "${label.value}"
          ){
            id
            label
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
    this._setDefaultSkill()
  }

  render () {
    const { skill, onCancel } = this.props
    const { label } = this.state

    return (
      <SkillForm
        modify={skill != null}
        label={label}
        onChange={this._onChange}
        onFormSubmit={this._onSubmit}
        onCancel={onCancel}
      />
    )
  }
}

export default SmartSkillsForm
