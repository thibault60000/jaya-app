import React from 'react'
import PropTypes from 'prop-types'

import { makeQuery } from '../../services/data-service'
import Dropdown from './Dropdown'

class SubjectDropdown extends React.Component {
  state = {
    subjects: [],
    loading: true
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filterPredicat: PropTypes.func,
    selectedItem: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  }

  static defaultProps = {
    filterPredicat: item => true
  }

  componentDidMount () {
    const query = `
      query {
        allSubjects {
          id
          label
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(subjects => this.setState({ subjects, loading: false }))
  }

  render () {
    const { subjects } = this.state
    const { onChange, selectedItem, filterPredicat } = this.props

    return (
      <div className="competenceDropdown">
        <Dropdown
          label={`Unité d'enseignement`}
          onChange={onChange}
          selectedItem={selectedItem}
          list={subjects.filter(filterPredicat)}
          defaultLabel='Selectionnez une UE...'
        />
      </div>
      
    )
  }
}

export default SubjectDropdown
