import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class Dropdown extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    selectedItem: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }),
    defaultLabel: PropTypes.string.isRequired
  };

  static defaultProps = {
    list: [],
    defaultLabel: 'Selectionnez un item...',
    selectedItem: null
  };

  state = {
    active: false
  };

  _openDropdown = () => {
    this.setState({
      ...this.state,
      active: !this.state.active
    })
  };

  _selectItem = (item) => {
    this.setState({
      ...this.setState,
      active: false
    })

    this.props.onChange(item)
  }

  _renderItems = () => {
    const { list } = this.props
    return list.map(item => (
      <a key={item.id}
        onClick={() => this._selectItem(item)}
        className='dropdown-item'>
        { item.label }
      </a>
    ))
  }

  render () {
    const dropdownBtnClasses = classNames('dropdown', { 'is-active': this.state.active })
    const { defaultLabel, selectedItem, label } = this.props

    return (
      <div className='field coDropdown'>
        {label && <label className='label'>{label}</label>}
        <div className={dropdownBtnClasses}>
          <div className='dropdown-trigger'>
            <button type='button' onClick={this._openDropdown} className='button' aria-haspopup='true' aria-controls='dropdown-menu3'>
              <span>{selectedItem !== null ? selectedItem.label : defaultLabel}</span>
              <span className='icon is-small is-right'>
                <i className='fa fa-angle-down' aria-hidden='true' />
              </span>
            </button>
          </div>

          <div className='dropdown-menu' id='dropdown-menu' role='menu'>
            <div className='dropdown-content'>
              { this._renderItems() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dropdown
