import React from 'react'
import PropTypes from 'prop-types'
import { makeQuery } from '../../services/data-service'
import history from '../../routing/history'
import { Loading } from '../../components'
import SmartSubjectForm from './SmartSubjectForm'

class SmartSubjectsModify extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    subject: null
  }

  _getSubject = (id) => {
    const query = `
      query {
        subjectById(id: "${id}") {
          id
          label
          apogeeCode
          description
          capacity
          semester
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(subject => this.setState({ subject, loading: false }))
      .catch(() => window.alert(`Impossible de récupérer la compétence ${id}`))
  }

  _returnToList = () => history.push('/admin/subjects')

  componentDidMount () {
    const { match } = this.props
    if (isNaN(parseInt(match.params.id))) {
      history.push('/404')
    } else {
      this._getSubject(match.params.id)
    }
  }

  render () {
    const { loading, subject } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Modification d'une matière</h3>
        <section>
          { loading && <Loading /> }
          { subject != null && (
            <SmartSubjectForm
              subject={subject}
              onSuccess={this._returnToList}
              onCancel={this._returnToList}
            />
          )}
        </section>
      </div>
    )
  }
}

export default SmartSubjectsModify
