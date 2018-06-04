import React from 'react'
import { Link } from 'react-router-dom'

import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'

class SmartGroupsHome extends React.Component {
  state = {
    loading: true,
    groups: []
  }

  componentDidMount () {
    this._updateGroups()
  }

  render () {
    const { loading, groups } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Gestion des groupes d'étudiants MIAGE</h3>
        {!loading && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 className='title is-4'>Options :</h3>
            <Link className='button is-primary' to='/admin/groups/add'><FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} />Ajouter un groupe</Link>
          </section>
        )}
        <section>
          <h3 className='title is-4'>Liste des groupes :</h3>
        </section>
        <section>
          {(loading) && <Loading />}
          {(!loading && groups) && (
            <div style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Label</th>
                    <th>Matière</th>
                    <th>Nb étudiants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(({ id, label, subject, students }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{label}</td>
                      <td>{subject.label}</td>
                      <td>{students.length}</td>
                      <td>
                        <Link
                          to={`/admin/groups/modify/${id}`}
                          className='button is-primary'
                          style={{ marginRight: '0.5rem' }}>
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier
                        </Link>
                        <button
                          className='button is-primary'
                          onClick={() => this._deleteGroup(id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} />Supprimer
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

  _updateGroups = () => {
    const query = `
      query {
        allSubjectGroups {
          id
          label
          subject {
            label
          }
          students { id }
        }
      }
    `
    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(groups => this.setState({ groups, loading: false }))
      .catch(e => {
        console.error(e)
        window.alert('Impossible de récupérer les groupes.')
      })
  }

  _deleteGroup = groupId => {
    const query = `
      mutation {
        deleteGroup(id: ${groupId}) {
          dataId
        }
      }
    `
    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(() => this._updateGroups())
      .catch(e => {
        console.error(e)
        window.alert('Impossible de supprimer le groupe.')
      })
  }
}

export default SmartGroupsHome
