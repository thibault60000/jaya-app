import React from 'react'
import PropTypes from 'prop-types'

import jayaMobile from '../../assets/img/jayaLogoMobile.png'
import jayaMobileAdmin from '../../assets/img/jayaLogoMobileAdmin.png'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faIdCard from '@fortawesome/fontawesome-free-solid/faIdCard'

const getUserImage = (userType) => {
  switch (userType) {
    case 'STUDENT':
      return (
        <img className='studentHomeLogo' src={jayaMobile} alt='logo Jaya' />
      )
    default:
      return (
        <img className='studentHomeLogo' src={jayaMobileAdmin} alt='logo Jaya' />
      )
  }
}

const getUserInfo = (userType, userInfo) => {
  switch (userType) {
    case 'ADMIN':
      return (
        <ul className='listIdentity'>
          <li><FontAwesomeIcon icon={faUser} /> Administrateur de la plateforme</li>
          <li><FontAwesomeIcon icon={faEnvelope} /> Email: {userInfo.email}</li>
        </ul>
      )
    case 'STUDENT':
      return (
        <ul className='listIdentity'>
          <li><FontAwesomeIcon icon={faUser} /> Etudiant MIAGE</li>
          <li><FontAwesomeIcon icon={faIdCard} /> Numéro étudiant: {userInfo.studentNumber}</li>
          <li><FontAwesomeIcon icon={faEnvelope} /> Email: {userInfo.email}</li>
        </ul>
      )
    case 'PROFESSOR':
      return (
        <ul className='listIdentity'>
          <li><FontAwesomeIcon icon={faUser} /> Enseignant MIAGE</li>
          <li><FontAwesomeIcon icon={faEnvelope} /> Email: {userInfo.email}</li>
        </ul>
      )
    default:
      return null
  }
}

const getUserName = (userType, userInfo) => {
  switch (userType) {
    case 'STUDENT':
    case 'PROFESSOR':
      return (
        <h1>{userInfo.firstName} {userInfo.lastName}</h1>
      )
    case 'ADMIN':
      return (
        <h1>Admin</h1>
      )
  }
}

const IdentityContent = ({
  userType,
  userInfo
}) => (
  <div>
    { getUserImage(userType) }
    <section className='userInfos'>
      { getUserName(userType, userInfo) }
      { getUserInfo(userType, userInfo) }
    </section>
  </div>
)

IdentityContent.propTypes = {
  userType: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired
}

export default IdentityContent
