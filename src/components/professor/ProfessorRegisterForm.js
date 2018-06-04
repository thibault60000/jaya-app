import React from 'react'
import PropTypes from 'prop-types'

const ProfessorRegisterForm = ({
  firstName,
  lastName,
  email,
  password,
  errors,
  loading,
  onSubmit,
  onChange
}) => (
  <form onSubmit={onSubmit} className='jayaForm'>
    <div className='columns coIdentif'>

      {/* NOM */}
      <div className='field column is-half'>
        <p className='control'>
          <input className='input' type='text' placeholder='Nom' name='lastName' autoComplete='family-name' onChange={onChange} value={lastName} />
        </p>
      </div>

      {/* PRENOM */}
      <div className='field column is-half'>
        <p className='control'>
          <input className='input' type='text' placeholder='Prénom' name='firstName' autoComplete='given-name' onChange={onChange} value={firstName} />
        </p>
      </div>
    </div>

    {/* EMAIL */}
    <div className='field'>
      <p className='control'>
        <input className='input' type='email' placeholder='Email' name='email' autoComplete='email' onChange={onChange} value={email} />
      </p>
    </div>

    {/* PASSWORD */}
    <div className='field'>
      <p className='control'>
        <input className='input' type='password' placeholder='Mot de passe' name='password' autoComplete='current-password' onChange={onChange} value={password} />
      </p>

      {/* <p className="errorMsg error"></p> */}
    </div>

    {/* SUBMIT */}
    <div className='field'>
      <p className='control'>
        <input type='submit' value='inscription' />
      </p>
    </div>
  </form>
)

ProfessorRegisterForm.prototype = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ProfessorRegisterForm
