import React from 'react'
import { Link } from 'react-router-dom'

import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'
import { validateStudent } from '../../services/user-service'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'

class SmartStudentsHome extends React.Component {
  state = {
    loading: true,
    verificationPendingStudents: null,
    verifiedStudents: null
  }

  componentDidMount () {
    this._updateStudents()
  }

  render () {
    const {
      loading,
      verificationPendingStudents,
      verifiedStudents
    } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Gestion des étudiants de la MIAGE</h3>
        {!loading && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 className='title is-4'>Options :</h3>
            <Link className='button is-primary' to='/admin/students/add'> <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter un étudiant</Link>
          </section>
        )}
        <section>
          <h3 className='title is-4' style={{ marginBottom: '2rem' }}>Liste des étudiants :</h3>
        </section>
        <div>
          {(loading) && <Loading />}
          {(!loading && verificationPendingStudents != null && verificationPendingStudents.length > 0) && (
            <section>
              <h4 className='title is-5'>En attente de vérification</h4>
              <div style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Identifiant</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>N° étudiant</th>
                      <th className="specialiteCol">Spécialité</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verificationPendingStudents.map(({ id, firstName, lastName, credentials, studentNumber, specialization }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{lastName.toUpperCase()}</td>
                        <td>{firstName}</td>
                        <td>{credentials.email}</td>
                        <td>{studentNumber}</td>
                        <td className="specialiteCol">{specialization.label}</td>
                        <td>
                          <button
                            className='button is-primary'
                            onClick={() => this._validateStudent(id)}
                          >
                            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '0.5rem' }} /> Valider le compte
                          </button>
                          <Link
                            to={`/admin/students/modify/${id}`}
                            className='button is-primary'
                            style={{ marginRight: '0.5rem' }}>
                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier
                          </Link>
                          <button
                            className='button is-primary'
                            onClick={() => this._deleteStudent(id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {(!loading && verifiedStudents != null && verifiedStudents.length > 0) && (
            <section>
              <h4 className='title is-5'>Étudiants validés</h4>
              <div style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Identifiant</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>N° étudiant</th>
                      <th className="specialiteCol">Spécialité</th>
                      <th className="valideActionCol">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedStudents.map(({ id, firstName, lastName, credentials, studentNumber, specialization }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{lastName.toUpperCase()}</td>
                        <td>{firstName}</td>
                        <td>{credentials.email}</td>
                        <td>{studentNumber}</td>
                        <td className="specialiteCol">{specialization.label}</td>
                        <td className="valideActionCol">
                          <Link
                            to={`/admin/students/modify/${id}`}
                            className='button is-primary'
                            style={{ marginRight: '0.5rem' }}>
                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier
                          </Link>
                          <button
                            className='button is-primary'
                            onClick={() => this._deleteStudent(id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  _updateStudents = () => {
    this.setState({ loading: true })
    const query = `
      query {
        allStudents {
          id
          firstName
          lastName
          studentNumber
          credentials {
            email
            isVerified
          }
          specialization {
            label
          }
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(students => {
        const { verified, unverified } = students.reduce(({ verified, unverified }, student) => {
          if (student.credentials.isVerified) {
            verified.push(student)
          } else {
            unverified.push(student)
          }
          return { verified, unverified }
        }, {
          verified: [],
          unverified: []
        })

        this.setState({
          loading: false,
          verificationPendingStudents: unverified,
          verifiedStudents: verified
        })
      })
  }

  _validateStudent = (id) => {
    validateStudent(id).then(this._updateStudents)
  }

  _deleteStudent = (id) => {
    this.setState({ loading: true })
    const query = `
      mutation {
        deleteStudent (id: ${id}) {
          dataId
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(() => this._updateStudents())
      .catch(() => window.alert('Impossible de supprimer un étudiant, rechargez la page ou contactez le support'))
  }
}

export default SmartStudentsHome
