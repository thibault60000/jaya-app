import React from 'react'
import { Link } from 'react-router-dom'

import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'

class SmartSpecializationsDetails extends React.Component {
  state = {
    loading: true,
    specialization: null,
    subjectsBySkill: null,
    specializationSkills: null
  }

  componentDidMount () {
    this._getData(this.props.match.params.id)
  }

  render () {
    const { loading, specialization, subjectsBySkill, specializationSkills } = this.state
    const { match } = this.props

    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        {!loading && (
          <React.Fragment>
            <h3 className='title is-3'>Parcours: {specialization.label}</h3>
            <section style={{ marginBottom: '2rem' }}>
              <h3 className='title is-4'>Options :</h3>
              <Link className='button is-primary' to={`/admin/specializations/modify/${match.params.id}`}> <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem', marginBottom: '0.2rem' }} /> Modifier le parcours</Link>
              <Link className='button is-primary' to={`/admin/specializations/subjects/add/${match.params.id}`}> <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter des UEs</Link>
              <Link className='button is-primary' to={`/admin/specializations/skills/add/${match.params.id}`}> <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter des informations sur les compétences</Link>
            </section>
            <section>
              <h3 className='title is-4'>Informations sur les compétences :</h3>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Optionnelles à choisir</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {specializationSkills.map(({ skill, optionalSubjectsNb }) => (
                    <React.Fragment key={skill.id}>
                      <tr>
                        <td>{skill.label}</td>
                        <td>{optionalSubjectsNb}</td>
                        <td>
                          <button
                            className='button is-primary'
                            onClick={() => this._removeSkillFromSpecialization(skill.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Supprimer ces informations
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </section>
            <section>
              <h3 className='title is-4'>Informations sur les UE :</h3>
              {subjectsBySkill.map(({ id, label, subjects, optionalSubjectsNb }) => (
                <div key={id} style={{ marginBottom: '1.5rem' }}>
                  <h5 className='title is-5'>{label} ({optionalSubjectsNb} UE à choisir pour la période courante)</h5>

                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Identifiant</th>
                        <th>Label</th>
                        <th>Capacité</th>
                        <th>Optionnelle</th>
                        <th>Semestre</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map(({ id, label, capacity, semester, isOptional }) => (
                        <React.Fragment key={id}>
                          <tr>
                            <td>{id}</td>
                            <td>{label}</td>
                            <td>{capacity}</td>
                            <td>{isOptional ? 'OUI' : 'NON'}</td>
                            <td>
                              {(() => {
                                switch (semester) {
                                  case 'SEMESTER_1': return 'Semestre 1'
                                  case 'SEMESTER_2': return 'Semestre 2'
                                  default: return 'UE Annuelle'
                                }
                              })()}
                            </td>
                            <td>
                              <button
                                className='button is-primary'
                                onClick={() => this._removeSubjectFromSpecialization(id)}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Supprimer l'UE du parcours
                              </button>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </section>
          </React.Fragment>
        )}
        {(loading) && <Loading />}
      </div>
    )
  }

  _removeSkillFromSpecialization = (skillId) => {
    const query = `
      mutation {
        removeSkillFromSpecialization (
          specializationId: "${this.props.match.params.id}"
          skillId: "${skillId}"
        ) {
          dataId 
        }
      }
    `
    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(() => this._getData(this.props.match.params.id))
  }

  _removeSubjectFromSpecialization = (subjectId) => {
    const query = `
      mutation {
        removeSubjectFromSpecialization (
          specializationId: "${this.props.match.params.id}"
          subjectId: "${subjectId}"
        ) {
          dataId
        }
      }
    `
    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(() => this._getData(this.props.match.params.id))
  }

  _getData = (id) => {
    const specializationQuery = makeQuery({
      query: `
        query {
          specializationById(id: "${id}") {
            label
            acronym
            schoolYear {
              label
            }
          }
        }
      `,
      withAuthorization: false
    })

    const specializationSubjectsQuery = makeQuery({
      query: `
        query {
          getSpecializationSubjectBySpecializationId(id: "${id}") {
            subject {
              id
              label
              description
              capacity
              semester
            }
            skill {
              id,
              label,
            }
            isOptional
          }
        }
      `,
      withAuthorization: false
    })

    const specializationSkillsQuery = makeQuery({
      query: `
        query {
          getSpecializationSkillBySpecializationId(id:"${id}") {
            optionalSubjectsNb
            skill { id label } 
          }
        }
      `
    })

    Promise.all([specializationQuery, specializationSubjectsQuery, specializationSkillsQuery])
      .then(([ specialization, specializationSubjects, specializationSkills ]) => {
        const subjectsBySkill = specializationSubjects.reduce((all, specializationSubject, index) => {
          const { skill, subject, isOptional } = specializationSubject
          const skillIndex = all.findIndex(sk => sk.id === skill.id)
          const specializationSkill = specializationSkills.find(ss => ss.skill.id === skill.id)

          if (skillIndex !== -1) {
            all[skillIndex].subjects.push({ ...subject, isOptional })
          } else {
            all.push({
              id: skill.id,
              label: skill.label,
              optionalSubjectsNb: specializationSkill != null ? specializationSkill.optionalSubjectsNb : 0,
              subjects: [ { ...subject, isOptional } ]
            })
          }
          return all
        }, [])

        this.setState({ subjectsBySkill, specialization, loading: false, specializationSkills })
      })
      .catch((e) => {
        console.error(e)
        window.alert('Impossible de récupérer les données, contactez votre service IT')
      })
  }
}

export default SmartSpecializationsDetails
