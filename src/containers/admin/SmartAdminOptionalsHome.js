import React from 'react'
import Moment from 'moment-timezone'
import 'moment/locale/fr'

import { Loading } from '../../components'
import SmartAlgorithmForm from './SmartAlgorithmForm'
import { makeQuery } from '../../services/data-service'
import { getAlgorithmExport } from '../../services/pdf-service'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCode from "@fortawesome/fontawesome-free-solid/faCode";
import faShare from "@fortawesome/fontawesome-free-solid/faShare"
import faToggleOn from "@fortawesome/fontawesome-free-solid/faToggleOn"
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt"

Moment.locale('fr')

class SmartAdminOptionalsHome extends React.Component {
  state = {
    exportLoading: false,
    loading: true,
    versionsBySchoolYear: []
  }

  componentDidMount () {
    this._getSubjectChoicesVersion()
  }

  render () {
    const { versionsBySchoolYear, loading, exportLoading } = this.state
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Lancer l'algorithme de répartition des choix</h3>
        <p>
          La répartition des choix des optionnelles se fait automatiquement par un algorithme.
          Il est possible de le lancer plusieurs fois et de choisir une des versions des resultats produits.
        </p>
        <p>
          <strong>Il est déconseillé de changer de version de résultats après avoir constitué les groupes d'étudiants.</strong>
          &nbsp;L'algorithme a besoin de savoir quelle année d'étude est concernée et quel semestre.
        </p>

        <div style={{ margin: '1rem 0' }}>
          <SmartAlgorithmForm onSuccess={this._getSubjectChoicesVersion} />
        </div>

        <section style={{ margin: '2rem 0' }}>
          <h3 className='title is-3'>Résultats de l'algorithme</h3>

          {loading ? <Loading /> : (
            <div>
              {versionsBySchoolYear.map(({ id, label, versions }) => (
                <div key={id} style={{ margin: '1rem 0' }}>
                  <h4 className='title is-4'>Année : {label}</h4>
                  <h5 className='title is-5'>Semestre 1</h5>
                  {versions.filter(v => v.semester === 'SEMESTER_1').length > 0 ? (
                    <table className='table actionsResultTableAlgo'>
                      <thead>
                        <tr>
                          <th>Identifiant</th>
                          <th>Date</th>
                          <th>Version active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {versions.filter(v => v.semester === 'SEMESTER_1').map(({ id, date, isActive, semester }) => (
                          <tr key={id}>
                            <td>{id}</td>
                            <td>{Moment(date).format('LLLL')}</td>
                            <td>{isActive ? 'OUI' : 'NON'}</td>
                            <td>
                              <button
                                type='button'
                                className={`button is-primary ${exportLoading ? 'is-loading' : ''}`}
                                onClick={() => this._exportData(id, label, semester)}
                              >
                                <FontAwesomeIcon icon={faCode} style={{ marginRight: '0.5rem' }} />  Exporter le résultat
                              </button>
                              {!isActive && (
                                <React.Fragment>
                                  <button
                                    type='button'
                                    className='button is-primary'
                                    onClick={() => this._setAsActive(id)}
                                  >
                                    <FontAwesomeIcon icon={faToggleOn} style={{ marginRight: '0.5rem' }} />  Activer cette version
                                  </button>
                                  <button
                                    type='button'
                                    className='button is-primary'
                                    onClick={() => this._deleteVersion(id)}
                                  >
                                    <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Supprimer
                                  </button>
                                </React.Fragment>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Aucune version correspondante pour le moment.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    )
  }

  _getSubjectChoicesVersion = () => {
    const query = `
      query {
        allSubjectChoicesVersions {
          id
          date
          isActive
          schoolYear {
            id
            label
          }
          semester
        }
      }
    `

    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(versions => {
        const versionsBySchoolYear = versions.reduce((all, item) => {
          const schoolYearIndex = all.findIndex(schoolYear => schoolYear.id === item.schoolYear.id)

          if (schoolYearIndex === -1) {
            return [
              ...all,
              {
                id: item.schoolYear.id,
                label: item.schoolYear.label,
                versions: [{ id: item.id, date: item.date, semester: item.semester, isActive: item.isActive }]
              }
            ]
          } else {
            all[schoolYearIndex].versions.push({ id: item.id, date: item.date, semester: item.semester, isActive: item.isActive })
            return all
          }
        }, [])
          .sort(this._sortByProps('id'))
          .map((schoolYear) => {
            schoolYear.versions = schoolYear.versions.sort(this._sortByProps('id'))
            return schoolYear
          })

        this.setState({
          versionsBySchoolYear,
          loading: false
        })
      })
  }

  _exportData = (versionId, schoolYearLabel, semester) => {
    const query = `
      query {
        subjectChoicesVersionById(id:"${versionId}") {
          choices {
            student {
              id
              firstName
              lastName
              specialization { label acronym }
              studentNumber
            }
            specializationSubject {
              subject { label apogeeCode }
            }
            rank
          }
        }
      }
    `

    this.setState({ exportLoading: true })

    makeQuery({ query, withAuthorization: true })
      .then(version => {
        const choicesByStudents = this._getChoicesByStudents(version.choices)

        getAlgorithmExport({
          id: versionId,
          schoolYearLabel,
          semester,
          students: choicesByStudents
        }).download()
        this.setState({ exportLoading: false })
      })
      .catch(() => {
        window.alert(`Impossible d'exporter ces données. Contactez le service IT.`)
      })
  }

  _setAsActive = versionId => {
    const query = `
      mutation {
        setSubjectChoicesVersionAsActive (id: "${versionId}") {
          id
        }
      }
    `

    this.setState({ loading: false })

    makeQuery({ query, withAuthorization: true })
      .then(() => {
        this._getSubjectChoicesVersion()
      })
  }

  _deleteVersion = versionId => {
    const query = `
      mutation {      
        deleteSubjectChoicesVersion(id: "${versionId}") {
          dataId
        }
      }
    `

    this.setState({ loading: false })

    makeQuery({ query, withAuthorization: true })
      .then(() => {
        this._getSubjectChoicesVersion()
      })
  }

  _sortByProps = prop => (a, b) => {
    if (a[prop] < b[prop]) {
      return -1
    } else if (a[prop] > b[prop]) {
      return 1
    } else {
      return 0
    }
  }

  _getChoicesByStudents = choices => {
    return choices.reduce((all, item) => {
      const studentIndex = all.findIndex(s => s.id === item.student.id)

      if (studentIndex === -1) {
        return [
          ...all,
          {
            id: item.student.id,
            firstName: item.student.firstName,
            lastName: item.student.lastName.toUpperCase(),
            studentNumber: item.student.studentNumber,
            choices: [{
              rank: item.rank,
              label: item.specializationSubject.subject.label,
              apogeeCode: item.specializationSubject.subject.apogeeCode
            }]
          }
        ]
      } else {
        all[studentIndex].choices.push({
          rank: item.rank,
          label: item.specializationSubject.subject.label,
          apogeeCode: item.specializationSubject.subject.apogeeCode
        })
        return all
      }
    }, [])
      .sort(this._sortByProps('lastName'))
      .map(student => {
        student.choices = student.choices.sort(this._sortByProps('rank'))
        return student
      })
  }
}

export default SmartAdminOptionalsHome
