import React from 'react'

import logo from '../../assets/img/logo.png'

const PasswordResetPage = () => (

  <section className='connexion'>
    <div className='Logos'>
      <img src={logo} className='logoJaya' alt='Logo Jaya' />
    </div>

    {/* FORM */}
    <form action='#' className='jayaForm'>

      {/* ETUDIANT */}
      <div className='field'>
        <p className='control'>
          <input className='input' type='number' placeholder='N° Etudiant' />
        </p>
      </div>

      {/* EMAIL */}
      <div className='field'>
        <p className='control'>
          <input className='input' type='email' placeholder='Email' />
        </p>
      </div>

      {/* PASSWORD */}
      <div className='field'>
        <p className='control'>
          <input className='input' type='password' placeholder='Nouveau mot de passe' />
        </p>
      </div>

      {/* SUBMIT */}
      <div className='field'>
        <p className='control'>
          <input type='submit' value='envoyer' />
        </p>
      </div>
    </form>

    <div className='signInLinks'>
      <a href='#' aria-label='Se connecter'>Se connecter </a>
      <a href='#' aria-label="S'inscrire">S'inscrire </a>
    </div>

  </section>
)

export default PasswordResetPage
