import React from 'react'
import PropTypes from 'prop-types'
import user from '../../assets/img/man-user.png'
import lock from '../../assets/img/padlock.png'

const ConnectionForm = ({
  onSubmit,
  onChange,
  loading,
  email,
  password
}) => (
  <form className='jayaForm' onSubmit={onSubmit}>
    <div className='field'>
      <p className='control has-icons-left has-icons-right'>
        <input className='input' type='email' placeholder='Email' name='email' onChange={onChange} value={email} />
        <span className='icon is-small is-left'>
          <img src={user} alt='user icone' />
        </span>
        <span className='icon is-small is-right'>
          <i className='fa fa-check' />
        </span>
      </p>
    </div>

    <div className='field'>
      <p className='control has-icons-left'>
        <input className='input' type='password' placeholder='Mot de passe' name='password' onChange={onChange} value={password} />
        <span className='icon is-small is-left'>
          <img src={lock} alt='user icone' />
        </span>
      </p>
    </div>

    <div className='field'>
      <p className='control'>
        <input type='submit' value='connexion' />
      </p>
    </div>
  </form>
)

ConnectionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default ConnectionForm
