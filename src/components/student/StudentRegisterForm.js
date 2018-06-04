import React from 'react'
import PropTypes from 'prop-types'
import SpecializationDropdown from '../common/SpecializationDropdown'

const StudentRegisterForm = ({
  firstName,
  lastName,
  email,
  password,
  studentNumber,
  errors,
  specialization,
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

    <SpecializationDropdown
      onChange={(item) => onChange({
        target: {
          name: 'specialization',
          value: item
        }
      })
      }
      selectedItem={specialization}
    />

    {/* ETUDIANT */}
    <div className='field'>
      <p className='control'>
        <input className='input' type='text' placeholder='N° Etudiant' name='studentNumber' autoComplete='student-number' onChange={onChange} value={studentNumber} />
      </p>

    </div>

    {/* PASSWORD */}
    <div className='field'>
      <p className='control'>
        <input className='input' type='password' placeholder='Mot de passe' name='password' autoComplete='current-password' onChange={onChange} value={password} />
      </p>

      {/* <p className="errorMsg error"></p> */}
    </div>

    {/* EMAIL */}
    <div className='field'>
      <p className='control'>
        <input className='input' type='email' placeholder='Email' name='email' autoComplete='email' onChange={onChange} value={email} />
      </p>
    </div>

    {/* SUBMIT */}
    <div className='field'>
      <p className='control'>
        <input type='submit' value='inscription' />
      </p>
    </div>
  </form>
)

StudentRegisterForm.prototype = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  studentNumber: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    studentNumber: PropTypes.string,
    specialization: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default StudentRegisterForm
