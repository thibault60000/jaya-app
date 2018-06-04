import React from 'react'
import { AddTeachingForm } from '../../components/index'
import { makeQuery } from '../../services/data-service'

class SmartAddTeachingForm extends React.Component {
  state = {
    subjects: []
  };

  componentDidMount () {
    const query = `
      query {
        allSubjects {
          id
          label
        }
      }
    `
    makeQuery({ query, withAuthorization: false })
      .then(subjects => this.setState({ ...this.state, subjects }))
      .catch((e) => {
        console.error(e)
        window.alert('Impossible de récupérer les UE')
      })
  }

  render () {
    const { subjects } = this.state
    return (
      <AddTeachingForm subjects={subjects} />
    )
  }
}

export default SmartAddTeachingForm
