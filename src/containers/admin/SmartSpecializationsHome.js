import React from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'

class SmartSpecializationsHome extends React.Component {
  state = {
    loading: false,
    specializationsBySchoolYear: null
  };

  componentDidMount () {
    this._updateSpecializations()
  }

  _deleteSpecialization = (id) => {
    this.setState({ loading: true })

    const query = `
      mutation {
        deleteSpecialization(id: ${id}) {
          dataId
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(() => this._updateSpecializations())
      .catch(() => window.alert('Impossible de supprimer un parcours, rechargez la page ou contactez le support'))
  }

  _updateSpecializations = () => {
    this.setState({ loading: true })

    const query = `
      query {
        allSpecializations {
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

    makeQuery({ query, withAuthorization: true })
      .then((specializations) => {
        this.setState({
          specializationsBySchoolYear: specializations.reduce((all, specialization) => {
            let schoolYearIndex = all.findIndex(schoolYear => schoolYear.id === specialization.schoolYear.id)

            if (schoolYearIndex === -1) {
              return [
                ...all, {
                  id: specialization.schoolYear.id,
                  label: specialization.schoolYear.label,
                  specializations: [{
                    id: specialization.id,
                    label: specialization.label,
                    acronym: specialization.acronym
                  }]
                }
              ]
            } else {
              all[schoolYearIndex].specializations = [
                ...all[schoolYearIndex].specializations, {
                  id: specialization.id,
                  label: specialization.label,
                  acronym: specialization.acronym
                }
              ]

              return all
            }
          }, []),
          loading: false
        })
      })
  };

  render () {
    const { loading, specializationsBySchoolYear } = this.state
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Gestion des parcours MIAGE</h3>
        {!loading && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 className='title is-4'>Options :</h3>
            <Link className='button is-primary' to='/admin/specializations/add'> <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter un parcours</Link>
          </section>
        )}
        <section>
          <h3 className='title is-4'>Liste des parcours :</h3>
        </section>
        <section>
          {(loading) && <Loading />}
          {(!loading && specializationsBySchoolYear) && specializationsBySchoolYear.map((sy) => (
            <div key={sy.id} style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
              <h3 className='title is-5'>Année: {sy.label}</h3>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Label</th>
                    <th>Acronym</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sy.specializations && sy.specializations.map(({ id, label, acronym }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{label}</td>
                      <td>{acronym}</td>
                      <td>
                        <Link
                          to={`/admin/specializations/${id}`}
                          className='button is-primary'
                          style={{ marginRight: '0.5rem' }}
                        >
                          <FontAwesomeIcon icon={faEye} style={{ marginRight: '0.5rem' }} /> Voir les détails
                        </Link>
                        <Link
                          to={`/admin/specializations/modify/${id}`}
                          className='button is-primary'
                          style={{ marginRight: '0.5rem' }}
                        >
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier
                        </Link>
                        <button
                          className='button is-primary'
                          onClick={() => this._deleteSpecialization(id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem'}} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      </div>
    )
  }
}

export default SmartSpecializationsHome
