import React from 'react'
import PropTypes from 'prop-types'

import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'
import history from '../../routing/history'
import SmartProfessorForm from './SmartProfessorForm'

class SmartProfessorsModify extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    professor: null
  }

  componentDidMount () {
    const { id } = this.props.match.params
    if (isNaN(parseInt(id))) {
      history.push('/404')
    } else {
      this._getProfessor()
    }
  }

  render () {
    const { professor, loading } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem' }}>
        <h3 className='title is-3'>Modification d'un professeur</h3>
        <section>
          { loading && <Loading /> }
          { professor != null && (
            <SmartProfessorForm
              professor={professor}
              onSuccess={this._returnToList}
              onCancel={this._returnToList}
            />
          )}
        </section>
      </div>
    )
  }

  _getProfessor = () => {
    const { id } = this.props.match.params

    const query = `
      query {
        professorById(id: "${id}") {
          id
          lastName
          firstName
          credentials {
            id
            email
          }
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(professor => this.setState({ loading: false, professor }))
      .catch(e => {
        console.error(e)
        window.alert('Impossible de récupérer le professeur')
      })
  }

  _returnToList = () => history.push('/admin/professors')
}

export default SmartProfessorsModify
