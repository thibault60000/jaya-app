import React from 'react'
import PropTypes from 'prop-types'
import { makeQuery } from '../../services/data-service'
import history from '../../routing/history'
import { Loading } from '../../components'
import SmartSkillsForm from './SmartSkillsForm'

class SmartSkillsModify extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    specialization: null
  }

  _getSkill = (id) => {
    const query = `
      query {
        skillById(id: "${id}") {
          id
          label
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(skill => this.setState({ skill, loading: false }))
      .catch(() => window.alert(`Impossible de récupérer la compétence ${id}`))
  }

  _returnToList = () => history.push('/admin/skills')

  componentDidMount () {
    const { match } = this.props
    if (isNaN(parseInt(match.params.id))) {
      history.push('/404')
    } else {
      this._getSkill(match.params.id)
    }
  }

  render () {
    const { loading, skill } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Modification d'une compétence</h3>
        <section>
          { loading && <Loading /> }
          { skill != null && (
            <SmartSkillsForm
              skill={skill}
              onSuccess={this._returnToList}
              onCancel={this._returnToList}
            />
          )}
        </section>
      </div>
    )
  }
}

export default SmartSkillsModify
