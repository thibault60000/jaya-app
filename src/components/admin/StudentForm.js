import React from 'react'
import PropTypes from 'prop-types'

import SpecializationDropdown from '../common/SpecializationDropdown'
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faUndo from "@fortawesome/fontawesome-free-solid/faUndo";

function isDisabled (modify, loading, error, firstName, lastName, studentNumber, email, password, specialization) {
  return loading || error != null || firstName.value.length === 0 || firstName.error != null ||
    lastName.value.length === 0 || lastName.error != null || studentNumber.value.length === 0 || studentNumber.error != null ||
    email.value.length === 0 || email.error != null || specialization.value === null ||
    (!modify && (password.error != null || password.value.length === 0))
}

function StudentForm ({
  firstName,
  lastName,
  studentNumber,
  email,
  password,
  specialization,
  loading,
  error,
  modify,
  onChange,
  onFormSubmit,
  onCancel
}) {
  return (
    <form onSubmit={onFormSubmit}>
      <div className='field'>
        <label className='label'>Nom</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='lastName'
            value={lastName.value}
            onChange={onChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Prénom</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='firstName'
            value={firstName.value}
            onChange={onChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Numéro étudiant</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='studentNumber'
            value={studentNumber.value}
            onChange={onChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Email</label>
        <div className='control'>
          <input
            className='input'
            type='email'
            name='email'
            value={email.value}
            onChange={onChange}
          />
        </div>
      </div>
      {!modify && (
        <div className='field'>
          <label className='label'>Mot de passe</label>
          <div className='control'>
            <input
              className='input'
              type='password'
              name='password'
              value={password.value}
              onChange={onChange}
            />
          </div>
        </div>
      )}
      <div className='field'>
        <label className='label'>Formation</label>
        <SpecializationDropdown
          selectedItem={specialization.value}
          onChange={item => onChange({
            target: {
              name: 'specialization',
              value: item
            }
          })}
        />
      </div>
      <div className='field'>
        <div className='control'>
          <button
            className={`button is-primary ${loading ? 'is-loading' : ''}`}
            disabled={
              isDisabled(modify, loading, error, firstName, lastName, studentNumber, email, password, specialization)
            }
            type='submit'
          >
                        {modify ? (
              <React.Fragment>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                />{" "}
                Modifier
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                />{" "}
                Ajouter
              </React.Fragment>
            )}
          </button>
          <button
            className='button'
            disabled={loading}
            onClick={onCancel}
            type='button'
          >
            <FontAwesomeIcon
                  icon={faUndo}
                  style={{ marginRight: "0.5rem" }}
                />{" "} Annuler
          </button>
        </div>
      </div>
    </form>
  )
}

StudentForm.propTypes = {
  firstName: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  lastName: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  studentNumber: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  email: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  password: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  specialization: PropTypes.shape({
    value: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.label
    }),
    error: PropTypes.string
  }),
  loading: PropTypes.bool,
  modify: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

StudentForm.defaultProps = {
  firstName: {
    value: '',
    error: null
  },
  lastName: {
    value: '',
    error: null
  },
  studentNumber: {
    value: '',
    error: null
  },
  email: {
    value: '',
    error: null
  },
  password: {
    value: '',
    error: null
  },
  specialization: {
    value: null,
    error: null
  },
  loading: false,
  error: null,
  onChange: () => {},
  onFormSubmit: () => {},
  onCancel: () => {}
}

export default StudentForm
