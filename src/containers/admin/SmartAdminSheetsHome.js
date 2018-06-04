import React from 'react'

import { Loading } from '../../components'
import { makeQuery } from '../../services/data-service'
import { getAnnotatingSheet } from '../../services/pdf-service'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faDownload from "@fortawesome/fontawesome-free-solid/faDownload";


export class SmartAdminSheetsHome extends React.Component {
  state = {
    loading: true,
    sheetLoading: false,

    schoolYears: [],
    specializations: [],
    groups: [],
    subjects: [],

    criterias: {
      schoolYears: [],
      specializations: [],
      groups: [],
      subjects: []
    },

    title: ''
  }

  componentDidMount () {
    Promise.all([
      this._getSchoolYears(),
      this._getSpecializations(),
      this._getStudentGroups(),
      this._getSubjects()
    ])
      .then(([ schoolYears, specializations, groups, subjects ]) => {
        this.setState({ schoolYears, specializations, groups, subjects, loading: false })
      })
      .catch(() => window.alert('Une erreur est survenue.'))
  }

  render () {
    const { loading, schoolYears, specializations, groups, criterias, sheetLoading, title, subjects } = this.state
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Téléchargement des fiches d'émargement MIAGE</h3>
        <p style={{ marginBottom: '0.8rem' }}>Sélectionner les groupes d'étudiant à inclure dans la fiche. Les doublons seront éliminés !</p>
        {loading ? <Loading /> : (
          <form onSubmit={this._onSubmit}>
            <div className='field'>
              <h4 className='title is-4'>Fiches d'émargement globales :</h4>
              {schoolYears.map(sy => (
                <label key={sy.id} className='checkbox'>
                  <input
                    type='checkbox'
                    name='schoolYears'
                    value={sy.id}
                    onChange={this._onStateChanged}
                    checked={criterias.schoolYears.includes(sy.id)}
                  />
                  {sy.label}
                </label>
              ))}
            </div>

            <div className='field'>
              <h4 className='title is-4'>Fiches d'émargement par formation :</h4>
              {specializations.map(sp => (
                <label key={sp.id} className='checkbox'>
                  <input
                    type='checkbox'
                    name='specializations'
                    value={sp.id}
                    onChange={this._onStateChanged}
                    checked={criterias.specializations.includes(sp.id)}
                  />
                  {sp.label}
                </label>
              ))}
            </div>

            <div className='field'>
              <h4 className='title is-4'>Fiches d'émargement par groupes d'étudiants :</h4>
              {groups.map(g => (
                <label key={g.id} className='checkbox'>
                  <input
                    type='checkbox'
                    name='groups'
                    value={g.id}
                    onChange={this._onStateChanged}
                    checked={criterias.groups.includes(g.id)}
                  />
                  {g.label}
                </label>
              ))}
            </div>

            <div className='field'>
              <h4 className='title is-4'>Fiches d'émargement par matières :</h4>
              {subjects.map(s => (
                <label key={s.id} className='checkbox'>
                  <input
                    type='checkbox'
                    name='subjects'
                    value={s.id}
                    onChange={this._onStateChanged}
                    checked={criterias.subjects.includes(s.id)}
                  />
                  {s.label}
                </label>
              ))}
            </div>

            <div className='field'>
              <label htmlFor='title'>Nom de la fiche</label>
              <div className='control'>
                <input
                  className='input'
                  name='title'
                  type='text'
                  onChange={this._onStateChanged}
                  value={title}
                />
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <button
                  className={`button is-primary ${sheetLoading ? 'is-loading' : ''}`}
                  type='submit'
                >
                  <FontAwesomeIcon icon={faDownload} style={{ marginRight: '0.5rem' }} /> Télécharger
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    )
  }

  _onStateChanged = ({ target }) => {
    const { name, checked, value } = target

    if (name === 'title') {
      return this.setState({
        title: value
      })
    }
    if (checked) {
      this.setState({
        criterias: {
          ...this.state.criterias,
          [name]: [...this.state.criterias[name], value]
        }
      })
    } else {
      this.setState({
        criterias: {
          ...this.state.criterias,
          [name]: this.state.criterias[name].filter(id => id !== value)
        }
      })
    }
  }

  _onSubmit = (evt) => {
    evt.preventDefault()
    this.setState({ sheetLoading: true })
    const { title } = this.state
    const { specializations, groups, schoolYears, subjects } = this.state.criterias

    const query = `
      query {
        studentsByCriterias(
          criterias: {
            specializationIds: [${specializations}]
            schoolYearIds: [${schoolYears}]
            groupIds: [${groups}]
            subjectIds: [${subjects}]
          }
        ) {
          lastName
          firstName
          studentNumber
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then((students) => {
        const sheet = getAnnotatingSheet({ students, groupName: title })
        sheet.download()
        this.setState({ sheetLoading: false })
      })
      .catch(() => window.alert('Une erreur est survenue.'))
  }

  _getSpecializations = () => {
    const query = `
      query {
        allSpecializations {
          id
          label
        }
      }
    `
    return makeQuery({ query })
  }

  _getSchoolYears = () => {
    const query = `
      query {
        allSchoolYears {
          id
          label
        }
      }
    `
    return makeQuery({ query })
  }

  _getStudentGroups = () => {
    const query = `
      query {
        allSubjectGroups {
          id
          label
        }
      }
    `

    return makeQuery({ query })
  }

  _getSubjects = () => {
    const query = `
      query {
        allSubjects {
          id
          label
        }
      }
    `

    return makeQuery({ query })
  }
}

export default SmartAdminSheetsHome
