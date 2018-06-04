import React from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'

class SmartSkillsHome extends React.Component {
  state = {
    loading: false,
    skills: null
  }

  _deleteSkill = (id) => {
    this.setState({ loading: true })
    const query = `
      mutation {
        deleteSkill(id: ${id}) {
          dataId
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(() => this._updateSkills())
      .catch(() => window.alert('Impossible de supprimer une compétence, rechargez la page ou contactez le support'))
  }

  _updateSkills = () => {
    this.setState({ loading: true })

    const query = `
      query {
        allSkills {
          id
          label
        }
      }
    `

    makeQuery({ query, withAuthorization: false })
      .then(skills => this.setState({ loading: false, skills }))
      .catch(() => window.alert('Impossible de récupérer les compétences ! Rechargez la page !'))
  }

  componentDidMount () {
    this._updateSkills()
  }

  render () {
    const { loading, skills } = this.state

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Gestion des compétences MIAGE</h3>
        {!loading && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 className='title is-4'>Options :</h3>
            <Link className='button is-primary' to='/admin/skills/add'><FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter une compétence</Link>
          </section>
        )}
        <section>
          <h3 className='title is-4'>Liste des compétences :</h3>
        </section>
        <section>
          {(loading) && <Loading />}
          {(!loading && skills) && (
            <div style={{ marginTop: '2rem', paddingLeft: '1rem' }}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Label</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map(({ id, label }) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{label}</td>
                      <td>
                        <Link
                          to={`/admin/skills/modify/${id}`}
                          className='button is-primary'
                          style={{ marginRight: '0.5rem' }}>
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier
                        </Link>
                        <button
                          className='button is-primary'
                          onClick={() => this._deleteSkill(id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Supprimer
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

export default SmartSkillsHome
