import React from 'react'
import { Link } from 'react-router-dom'

import SmartProfessorRegisterForm from '../../containers/professor/SmartProfessorRegisterForm'
import logo from '../../assets/img/logo.png'

const ProfessorRegisterPage = () => (
  <section className='connexion'>
    <div className='Logos'>
      <img src={logo} className='logoJaya' alt='Logo Jaya' />
    </div>
    <h4 className='title is-4 has-text-centered has-text-white'>Inscription professeur</h4>
    <SmartProfessorRegisterForm />
    <div className='signInLinks'>
      <Link to='/connection/professor' aria-label='Déjà un compte ?'>Déjà un compte ? </Link>
    </div>
  </section>
)

export default ProfessorRegisterPage
