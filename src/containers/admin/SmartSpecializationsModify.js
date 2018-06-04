import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '../../components'
import history from '../../routing/history'
import { makeQuery } from '../../services/data-service'
import SmartSpecializationForm from './SmartSpecializationForm'

class SmartSpecializationsModify extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    specialization: null,
    specializationSubjects: null
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
          openingChoiceDateS1
          closingChoiceDateS1
          openingChoiceDateS2
          closingChoiceDateS2
        }
      }
    `

    const specializationSubjectsQuery = `
      query {
        getSpecializationSubjectBySpecializationId(id: "${id}") {
          subject {
            id
            label
          }
          skill {
            id
            label
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
          specializationSubjects
        })
      })
  }

  _returnToList = () => history.push('/admin/specializations')

  componentDidMount () {
    const { match } = this.props
    if (isNaN(parseInt(match.params.id))) {
      history.push('/404')
    } else {
      this._getSpecialization(match.params.id)
    }
  }

  render () {
    const { loading, specialization, specializationSubjects } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Modification d'un parcours</h3>
        <section>
          { loading && <Loading /> }
          { specialization != null && (
            <SmartSpecializationForm
              specializationSubjects={specializationSubjects}
              specialization={specialization}
              onSuccess={this._returnToList}
              onCancel={this._returnToList}
            />
          )}
        </section>
      </div>
    )
  }
}

export default SmartSpecializationsModify
