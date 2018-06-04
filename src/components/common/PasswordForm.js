import React from 'react'

function PasswordForm () {
  return (
    <div className='changePassword'>

      <h3>Changer le mot de passe</h3>
      <form action='#'>
        <div className='field'>
          <p className='control'>
            <input className='input' type='password' placeholder='Ancien mot de passe' />
          </p>
        </div>

        <div className='field'>
          <p className='control'>
            <input className='input' type='password' placeholder='Nouveau mot de passe' />
          </p>
        </div>

        <div className='field'>
          <p className='control'>
            <input className='input' type='password' placeholder='Confirmer mot de passe' />
          </p>
        </div>

        <div className='field'>
          <p className='control'>
            <input className='changePwdSubmit' type='submit' value='Soumettre' />
          </p>
        </div>

      </form>
    </div>
  )
}

export default PasswordForm
