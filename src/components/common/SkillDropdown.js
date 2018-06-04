import React from 'react'
import PropTypes from 'prop-types'

import { makeQuery } from '../../services/data-service'
import Dropdown from './Dropdown'

class SkillDropdown extends React.Component {
  state = {
    skills: [],
    loading: true
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filterList: PropTypes.func,
    selectedItem: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  }

  static defaultProps = {
    filterList: item => true
  }

  componentDidMount () {
    const query = `
      query {
        allSkills {
          id
          label
        }
      }
    `

    makeQuery({ query, withAuthorization: true })
      .then(skills => this.setState({ skills, loading: false }))
  }

  render () {
    const { skills } = this.state
    const { onChange, selectedItem, filterList } = this.props

    return (
      <div className="competenceDropdown">
        <Dropdown
        label='Compétence'
        
        onChange={onChange}
        selectedItem={selectedItem}
        list={skills.filter(filterList)}
        defaultLabel='Selectionnez une compétence'
      />
      </div>
      
      
    )
  }
}

export default SkillDropdown
