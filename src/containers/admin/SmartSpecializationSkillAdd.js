import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import SmartSpecializationSkillForm from './SmartSpecializationSkillForm'
import { Loading } from '../../components'
import history from '../../routing/history'
import { makeQuery } from '../../services/data-service'

class SmartSpecializationSkillAdd extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: true,
    paramError: false,
    specialization: null,
    specializationSkillsId: null
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
    const { loading, specialization, specializationSkillsId } = this.state
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Ajout d'informations sur une compétence pour un parcours</h3>
        <section>
          { loading && <Loading /> }
          { specialization != null && (
            <SmartSpecializationSkillForm
              specializationSkillsId={specializationSkillsId}
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

    const specializationSkillsQuery = `
      query {
        getSpecializationSkillBySpecializationId(id: "${id}") {
          skill {
            id
          }
        }
      }
    `

    const specialization = makeQuery({ query: specializationQuery, withAuthorization: false })
    const specializationSkills = makeQuery({ query: specializationSkillsQuery, withAuthorization: false })

    Promise.all([specialization, specializationSkills])
      .then(([ specialization, specializationSkills ]) => {
        this.setState({
          loading: false,
          specialization,
          specializationSkillsId: map(specializationSkills, 'skill').map(s => s.id)
        })
      })
  }

  _returnToDetails = () => history.push(`/admin/specializations/${this.props.match.params.id}`)
}

export default SmartSpecializationSkillAdd
