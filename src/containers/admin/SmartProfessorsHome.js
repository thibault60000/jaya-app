import React from 'react'
import { Link } from 'react-router-dom'

import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'
import { validateProfessor } from '../../services/user-service'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'

class SmartProfessorsHome extends React.Component {
  state = {
    loading: true,
    verificationPendingProfessors: null,
    verifiedProfessors: null
  }

  componentDidMount () {
    this._updateProfessors()
  }

  render () {
    const {
      loading,
      verificationPendingProfessors,
      verifiedProfessors
    } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Gestion des professeur de la MIAGE</h3>
        {!loading && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 className='title is-4'>Options :</h3>
            <Link className='button is-primary' to='/admin/professors/add'><FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter un professeur</Link>
          </section>
        )}
        <section>
          <h3 className='title is-4' style={{ marginBottom: '2rem' }}>Liste des professeurs :</h3>
        </section>
        <div>
          {(loading) && <Loading />}
          {(!loading && verificationPendingProfessors != null && verificationPendingProfessors.length > 0) && (
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verificationPendingProfessors.map(({ id, firstName, lastName, credentials }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{lastName.toUpperCase()}</td>
                        <td>{firstName}</td>
                        <td>{credentials.email}</td>
                        <td>
                          <button
                            className='button is-primary'
                            onClick={() => this._validateProfessor(id)}
                          >
                            Valider le compte
                          </button>
                          <Link
                            to={`/admin/professors/modify/${id}`}
                            className='button is-primary'
                            style={{ marginRight: '0.5rem' }}>
                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier
                          </Link>
                          <button
                            className='button is-primary'
                            onClick={() => this._deleteProfessor(id)}
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
          {(!loading && verifiedProfessors != null && verifiedProfessors.length > 0) && (
            <section>
              <h4 className='title is-5'>Professurs validés</h4>
              <div style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Identifiant</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedProfessors.map(({ id, firstName, lastName, credentials }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{lastName.toUpperCase()}</td>
                        <td>{firstName}</td>
                        <td>{credentials.email}</td>
                        <td>
                          <Link
                            to={`/admin/professors/modify/${id}`}
                            className='button is-primary'
                            style={{ marginRight: '0.5rem' }}>
                            Modifier
                          </Link>
                          <button
                            className='button is-primary'
                            onClick={() => this._deleteProfessor(id)}
                          >
                            Supprimer
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

  _updateProfessors = () => {
    this.setState({ loading: true })
    const query = `
      query {
        allProfessors {
          id,
          lastName,
          firstName,
          credentials {
            email
            isVerified
          }
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(professors => {
        const { verified, unverified } = professors.reduce(({ verified, unverified }, professor) => {
          if (professor.credentials.isVerified) {
            verified.push(professor)
          } else {
            unverified.push(professor)
          }
          return { verified, unverified }
        }, {
          verified: [],
          unverified: []
        })

        this.setState({
          loading: false,
          verifiedProfessors: verified,
          verificationPendingProfessors: unverified
        })
      })
  }

  _validateProfessor = (id) => {
    validateProfessor(id).then(this._updateProfessors)
  }

  _deleteProfessor = id => {
    this.setState({ loading: true })
    const query = `
      mutation {
        deleteProfessor (id: ${id}) {
          dataId
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(() => this._updateProfessors())
      .catch(() => window.alert('Impossible de supprimer un professeur, rechargez la page ou contactez le support'))
  }
}

export default SmartProfessorsHome
