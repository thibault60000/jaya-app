import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'
import history from '../../routing/history'
import SmartGroupForm from './SmartGroupForm'

class SmartGroupsModify extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    group: null
  }

  componentDidMount () {
    this._getGroup()
  }

  render () {
    const { loading, group } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Modification d'un groupe d'étudiant</h3>
        <section>
          {loading ? <Loading /> : (
            <SmartGroupForm
              group={group}
              onSuccess={this._returnToList}
              onCancel={this._returnToList}
            />
          )}
        </section>
      </div>
    )
  }

  _returnToList = () => history.push('/admin/groups')

  _getGroup = () => {
    const { id } = this.props.match.params

    const query = `
      query {
        subjectGroupById (id: "${id}") {
          id
          label
          type
          subject {
            id
            label
          }
          students {
            id
          }
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(group => {
        this.setState({ group, loading: false })
      })
      .catch(e => {
        console.error(e)
        window.alert('Impossible de récupérer le groupe.')
      })
  }
}

export default SmartGroupsModify
