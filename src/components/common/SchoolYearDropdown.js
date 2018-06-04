import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'
import { makeQuery } from '../../services/data-service'

class SchoolYearDropdown extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    selectedItem: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  }

  state = {
    schoolYears: [],
    loading: true,
    selectedItem: null
  }

  componentDidMount () {
    const query = `
      query {
        allSchoolYears {
          id
          label
        }
      }
    `

    makeQuery({ query, withAuthorization: false })
      .then(schoolYears => {
        this.setState({
          loading: false,
          schoolYears
        })
      })
      .catch((error) => {
        console.error(error, error.data)
        window.alert('Erreur, impossible de charger les années du master ! Rechargez la page')
        this.setState({
          loading: false
        })
      })
  }

  render () {
    const { schoolYears } = this.state
    const { onChange, selectedItem, label } = this.props
    return (
      <Dropdown
        label={label}
        onChange={onChange}
        selectedItem={selectedItem}
        list={schoolYears}
        defaultLabel='Selectionner une année...'
      />
    )
  }
}

export default SchoolYearDropdown
