import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import logo from '../../assets/img/logoJayaBlanc.png'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import faKey from '@fortawesome/fontawesome-free-solid/faKey'
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt'

class SiderBar extends React.Component {
  state = {
    open: false
  };

  static propTypes = {
    userType: PropTypes.string.isRequired,
    onDisconnectClick: PropTypes.func.isRequired
  };

  /* Listener to close Menu if Desktop */
  componentDidMount () {
    window.addEventListener('resize', this._updateDimensions())
  }

  /* Close Menu if Desktop */
  _updateDimensions = () => {
    if (window.innerWidth >= 700) {
      this.setState({
        ...this.state,
        open: false
      })
    }
  };

  _openMenuResponsive = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  };

  _renderAdmin = () => {
    return (
      <React.Fragment>
        <Link to='/'><FontAwesomeIcon icon={faHome} /> Accueil</Link><br />
        <Link to=''><FontAwesomeIcon icon={faKey} /> Changer mon mot de passe</Link><br />
      </React.Fragment>
    )
  };

  _renderProfessor = () => {
    return (
      <React.Fragment>
        <Link to='/'><FontAwesomeIcon icon={faHome} /> Accueil</Link><br />
        <Link to='/professor/subject/add'>Renseigner mes UEs</Link><br />
        <Link to=''><FontAwesomeIcon icon={faKey} /> Changer mon mot de passe</Link><br />
      </React.Fragment>
    )
  };

  _renderStudent = () => {
    return (
      <React.Fragment>
        <Link to='/'><FontAwesomeIcon icon={faHome} /> Accueil</Link><br />
        <Link to='/student/choices'>Choisir mes UE</Link><br />
        <Link to=''><FontAwesomeIcon icon={faKey} /> Changer mon mot de passe</Link><br />
      </React.Fragment>
    )
  };

  _renderContent = (userType) => {
    switch (userType) {
      case 'STUDENT':
        return this._renderStudent()
      case 'PROFESSOR':
        return this._renderProfessor()
      case 'ADMIN':
        return this._renderAdmin()
    }
  };

  render () {
    const { open } = this.state
    const { userType, onDisconnectClick } = this.props
    const sideBarClasses = classNames('sideBar', { open })
    const burgerBnClasses = classNames(this.state.user, 'burgerBtn', { open })
    return (
      <div className={sideBarClasses}>
        <button onClick={this._openMenuResponsive} className={burgerBnClasses} aria-label='Ouvrir le menu'>
          <svg viewBox='0 0 24 24'>
            <path d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
          </svg>
        </button>

        <img className='desktopSidebarLogo' src={logo} alt='logo Jaya' />
       
        { this._renderContent(userType) }
        <button className='decoBtn' type='button' onClick={onDisconnectClick}><FontAwesomeIcon icon={faSignOutAlt} /> Se déconnecter</button>
      </div>
    )
  }
}

export default SiderBar
