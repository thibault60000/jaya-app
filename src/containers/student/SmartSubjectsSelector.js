import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { arrayMove } from 'react-sortable-hoc'

import { Loading, SortableSubjectList } from '../../components'
import { makeQuery } from '../../services/data-service'

const withUserInfo = connect(
  state => ({
    userId: state.auth.id,
    userSpecialization: state.auth.info.specialization
  }),
  null
)

class SmartSubjectsSelector extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
    userSpecialization: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    }),
    semester: PropTypes.oneOf(['SEMESTER_1', 'SEMESTER_2'])
  }

  state = {
    loading: true,
    choicesBySkills: []
  }

  componentDidMount () {
    this._getUserChoices()
  }

  render () {
    const { loading, choicesBySkills } = this.state

    return (
      <div className='ueListContainer'>
        <h2>Choix des UE</h2>
        <p>
          Il s'agit de classer les UE par ordre de préférence dans chaque compétences.
          Elles seront ensuite répartie selon votre classement avec la contrainte du nombre de place: si votre UE n°1 n'a plus de place
          vous obtiendrez la deuxième.
        </p>
        <p>L'ordre de répartition est défini aléatoirement. N'importe quel élève peut se retrouver premier.</p>
        {loading ? <Loading /> : (
          <React.Fragment>
            {choicesBySkills.map(skill =>
              <SortableSubjectList
                key={skill.id}
                id={skill.id}
                label={skill.label}
                choices={skill.choices}
                onSortEnd={this._onSortEnd}
              />
            )}
            <div>
              <button
                style={{ margin: '1rem 0' }}
                className='button is-primary'
                type='button'
                onClick={this._updateUserChoices}
              >
                Valider mes classements
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }

  _getUserChoices = () => {
    const { userId, semester } = this.props
    const query = `
      query {
        subjectChoicesByUserAndSemester(
          studentId: "${userId}"
          semester: ${semester}
        ) {
          id
          rank
          specializationSubject {
            id
            subject { id label }
            skill { id label }
          }
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(subjectChoices => {
        if (subjectChoices.length === 0) {
          this._createUserChoices()
        } else {
          this.setState({
            loading: false,
            choicesBySkills: this._groupChoicesBySkill(subjectChoices)
          })
        }
      })
  }

  _createUserChoices = () => {
    const { userId, semester } = this.props
    const query = `
      mutation {
        createInitialSubjectChoices(
          studentId: "${userId}"
          semester: ${semester}
        ) {
          id
          rank
          specializationSubject {
            id
            subject { id label }
            skill { id label }
          }
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(subjectChoices => {
        this.setState({
          loading: false,
          choicesBySkills: this._groupChoicesBySkill(subjectChoices)
        })
      })
  }

  _updateUserChoices = () => {
    const { userId } = this.props
    const { choicesBySkills } = this.state

    const choicesList = choicesBySkills.reduce((all, item) => [
      ...all,
      ...item.choices.map(({ id, rank }) => ({ id, rank }))
    ], [])

    const query = `
      mutation {
        updateSubjectChoices (
          studentId: "${userId}"
          choices: [${choicesList.map(({ id, rank }) => `{ id: "${id}" rank: ${rank} }`)}]
        ) {
          id
          rank
          specializationSubject {
            id
            subject { id label }
            skill { id label }
          }
        }
      }
    `

    this.setState({ loading: true })

    makeQuery({ query, withAuthorization: true })
      .then(subjectChoices => {
        this.setState({
          loading: false,
          choicesBySkills: this._groupChoicesBySkill(subjectChoices)
        })

        window.alert('Choix sauvegardés')
      })
  }

  _onSortEnd = ({ id, oldIndex, newIndex }) => {
    const { choicesBySkills } = this.state
    const newChoicesBySkills = [ ...choicesBySkills ]

    const skillIndex = newChoicesBySkills.findIndex(s => s.id === id)
    const newChoicesList = arrayMove([...newChoicesBySkills[skillIndex].choices], oldIndex, newIndex)

    newChoicesBySkills[skillIndex].choices = newChoicesList.map((choice, index) => ({ ...choice, rank: index + 1 }))

    this.setState({
      choicesBySkills: newChoicesBySkills
    })
  }

  _groupChoicesBySkill = (subjectChoices) => {
    return subjectChoices
      .reduce((all, { specializationSubject, rank, id }) => {
        const skillIndex = all.findIndex(x => parseInt(x.id) === parseInt(specializationSubject.skill.id))

        if (skillIndex === -1) {
          return [
            ...all,
            {
              id: specializationSubject.skill.id,
              label: specializationSubject.skill.label,
              choices: [{
                id,
                rank,
                label: specializationSubject.subject.label,
                specializationSubjectId: specializationSubject.id
              }]
            }
          ]
        } else {
          all[skillIndex] = {
            ...all[skillIndex],
            choices: [
              ...all[skillIndex].choices,
              {
                id,
                rank,
                label: specializationSubject.subject.label,
                specializationSubjectId: specializationSubject.id
              }
            ]
          }
          return all
        }
      }, [])
      .map((skill) => {
        skill.choices = skill.choices.sort((a, b) => {
          if (a.rank < b.rank) {
            return -1
          } else if (b.rank < a.rank) {
            return 1
          } else {
            return 0
          }
        })

        return skill
      })
      .sort((a, b) => {
        if (a.id < b.id) {
          return -1
        } else if (b.id < a.id) {
          return 1
        } else {
          return 0
        }
      })
  }
}

export default withUserInfo(SmartSubjectsSelector)
