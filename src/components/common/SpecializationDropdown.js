import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'
import { makeQuery } from '../../services/data-service'

class SpecializationDropdown extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    selectedItem: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  };

  state = {
    specializations: [],
    loading: true
  };

  componentDidMount () {
    const query = `
      query {
        allSpecializations {
          id
          label
        }
      }
    `

    makeQuery({ query, withAuthorization: false })
      .then(specializations => {
        this.setState({
          ...this.state,
          loading: false,
          specializations
        })
      })
      .catch((error) => {
        console.error(error, error.data)
        window.alert('Erreur, impossible de charger les fillières ! Rechargez la page')
        this.setState({
          ...this.state,
          loading: false
        })
      })
  }

  render () {
    const { specializations } = this.state
    const { onChange, selectedItem } = this.props
    return (
      <Dropdown
        onChange={onChange}
        selectedItem={selectedItem}
        list={specializations}
        defaultLabel='Selectionner une formation...'
      />
    )
  }
}

export default SpecializationDropdown
