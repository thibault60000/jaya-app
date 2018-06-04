import React from 'react'
import PropTypes from 'prop-types'

import SmartStudentsForm from './SmartStudentsForm'
import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'
import history from '../../routing/history'

class SmartStudentsModify extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    student: null
  }

  componentDidMount () {
    const { id } = this.props.match.params
    if (isNaN(parseInt(id))) {
      history.push('/404')
    } else {
      this._getStudent()
    }
  }

  render () {
    const { student, loading } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem' }}>
        <h3 className='title is-3'>Modification d'un étudiant</h3>
        <section>
          { loading && <Loading /> }
          { student != null && (
            <SmartStudentsForm
              student={student}
              onSuccess={this._returnToList}
              onCancel={this._returnToList}
            />
          )}
        </section>
      </div>
    )
  }

  _getStudent = () => {
    const { id } = this.props.match.params

    const query = `
      query {
        studentById(id: "${id}") {
          id
          lastName
          firstName
          studentNumber
          credentials {
            id
            email
          }
          specialization {
            id
            label
          }
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(student => this.setState({ loading: false, student }))
      .catch(e => {
        console.error(e)
        window.alert(`Impossible de récupérer l'étudiant`)
      })
  }

  _returnToList = () => history.push('/admin/students')
}

export default SmartStudentsModify
