import React from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'

class SmartSubjectsHome extends React.Component {
  state = {
    loading: false,
    subjects: null
  };

  _updateSubjects = () => {
    this.setState({ loading: true })
    const query = `
      query {
        allSubjects {
          id
          label
          apogeeCode
          capacity
          semester
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(subjects => this.setState({ subjects, loading: false }))
      .catch(() => window.alert('Impossible de récupérer les matières ! Rechargez la page ou contactez le support.'))
  }

  _deleteSubject = (id) => {
    this.setState({ loading: true })
    const query = `
      mutation {
        deleteSubject(id: ${id}) {
          dataId
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(() => this._updateSubjects())
  }

  componentDidMount () {
    this._updateSubjects()
  }

  render () {
    const { loading, subjects } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Gestion des UE MIAGE</h3>
        {!loading && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 className='title is-4'>Options :</h3>
            <Link className='button is-primary' to='/admin/subjects/add'><FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter une matière</Link>
          </section>
        )}
        <section>
          <h3 className='title is-4'>Liste des UE :</h3>
        </section>
        <section>
          {(loading) && <Loading />}
          {(!loading && subjects) && (
            <div style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Label</th>
                    <th>Code APOGEE</th>
                    <th>Capacité</th>
                    <th>Semestre</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map(({ id, label, apogeeCode, capacity, semester }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{label}</td>
                      <td>{apogeeCode}</td>
                      <td>{capacity}</td>
                      <td>{(() => {
                        switch (semester) {
                          case 'SEMESTER_1': return 'Semestre 1'
                          case 'SEMESTER_2': return 'Semestre 2'
                          case 'ANNUAL': return 'Annuel'
                          default: return 'N/A'
                        }
                      })()}</td>
                      <td>
                        <Link
                          to={`/admin/subjects/modify/${id}`}
                          className='button is-primary'
                          style={{ marginRight: '0.5rem' }}>
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier
                        </Link>
                        <button
                          className='button is-primary'
                          onClick={() => this._deleteSubject(id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem'}} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default SmartSubjectsHome
