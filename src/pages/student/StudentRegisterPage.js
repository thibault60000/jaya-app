import React from 'react'
import { Link } from 'react-router-dom'

import SmartStudentRegisterForm from '../../containers/student/SmartStudentRegisterForm'
import logo from '../../assets/img/logo.png'

const StudentRegisterPage = () => (
  <section className='connexion'>
    <div className='Logos'>
      <img src={logo} className='logoJaya' alt='Logo Jaya' />
    </div>
    <h4 className='title is-4 has-text-centered has-text-white'>Inscription étudiant</h4>
    <SmartStudentRegisterForm />
    <div className='signInLinks'>
      <Link to='/connection/student' href='#' aria-label='Déjà un compte ?'>Déjà un compte ? </Link>
    </div>
  </section>
)

export default StudentRegisterPage
