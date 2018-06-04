import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import SmartSpecializationSubjectForm from './SmartSpecializationSubjectForm'
import { Loading } from '../../components'
import history from '../../routing/history'
import { makeQuery } from '../../services/data-service'

class SmartSpecializationSubjectAdd extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    specialization: null,
    specializationSubjectsId: null
  }

  componentDidMount () {
    const { match } = this.props
    if (isNaN(parseInt(match.params.id))) {
      history.push('/404')
    } else {
      this._getSpecialization(match.params.id)
    }
  }

  render () {
    const { loading, specialization, specializationSubjectsId } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Ajout de matière pour un parcours</h3>
        <section>
          { loading && <Loading /> }
          { specialization != null && (
            <SmartSpecializationSubjectForm
              specializationSubjectsId={specializationSubjectsId}
              specialization={specialization}
              onSuccess={this._returnToDetails}
              onCancel={this._returnToDetails}
            />
          )}
        </section>
      </div>
    )
  }

  _getSpecialization = (id) => {
    const specializationQuery = `
      query {
        specializationById(id: "${id}") {
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

    const specializationSubjectsQuery = `
      query {
        getSpecializationSubjectBySpecializationId(id: "${id}") {
          subject {
            id
          }
        }
      }
    `

    const specialization = makeQuery({ query: specializationQuery, withAuthorization: false })
    const specializationSubjects = makeQuery({ query: specializationSubjectsQuery, withAuthorization: false })

    Promise.all([specialization, specializationSubjects])
      .then(([ specialization, specializationSubjects ]) => {
        this.setState({
          loading: false,
          specialization,
          specializationSubjectsId: map(specializationSubjects, 'subject').map(s => s.id)
        })
      })
  }

  _returnToDetails = () => history.push(`/admin/specializations/${this.props.match.params.id}`)
}

export default SmartSpecializationSubjectAdd
