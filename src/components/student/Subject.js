import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Subject extends React.Component {
  static propTypes = {
    subject: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      description: PropTypes.string
    })
  }

  state = { isOpen: false }

  render () {
    const { subject } = this.props
    const classnames = classNames({ open: this.state.isOpen })

    return (
      <div className={classnames}>
        <button onClick={this._toggleDescription}>{subject.label}</button>
        <p className={classnames}>{subject.description}</p>
      </div>
    )
  }

  _toggleDescription = () => this.setState({ isOpen: !this.state.isOpen })
}

export default Subject
