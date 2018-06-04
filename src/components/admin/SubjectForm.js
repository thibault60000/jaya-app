import React from 'react'
import PropTypes from 'prop-types'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faUndo from "@fortawesome/fontawesome-free-solid/faUndo";

function isDisabled (label, apogeeCode, description, error, loading) {
  return loading || error != null ||
    label.value == null || label.value.length === 0 || label.error != null ||
    apogeeCode.value == null || apogeeCode.value.length === 0 || apogeeCode.error != null ||
    description.value == null || description.value.length === 0 || description.error != null
}

const SubjectForm = ({
  modify,
  label,
  apogeeCode,
  description,
  capacity,
  semester,
  error,
  onChange,
  onFormSubmit,
  onCancel,
  loading
}) => (
  <form onSubmit={onFormSubmit}>
    <div className='field'>
      <label htmlFor='label' className='label'>Nom de la matière</label>
      <div className='control'>
        <input
          className='input'
          type='text'
          placeholder='Interface Homme-Machine'
          name='label'
          value={label.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label htmlFor='label' className='label'>Code APOGEE</label>
      <div className='control'>
        <input
          className='input'
          type='text'
          placeholder='IHM-01'
          name='apogeeCode'
          value={apogeeCode.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label htmlFor='label' className='label'>Description</label>
      <div className='control'>
        <textarea
          className='input'
          placeholder='Une UE a propos des interface homme-machine'
          name='description'
          value={description.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label htmlFor='label' className='label'>Capacité</label>
      <div className='control'>
        <input
          className='input'
          placeholder='10'
          name='capacity'
          type='number'
          value={capacity.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label className='label'>Période scolaire</label>
      <div className='control'>
        <div className='select parentSelectAlgo'>
          <select
            onChange={onChange}
            value={semester.value}
            name='semester'
            required
            className="selectAlgorithme"
          >
            <option value='SEMESTER_1'>Semestre 1</option>
            <option value='SEMESTER_2'>Semestre 2</option>
            <option value='ANNUAL'>Annuel</option>
          </select>
        </div>
      </div>
    </div>
    <div className='field'>
      <div className='control'>
        <button
          className={`button is-primary ${loading ? 'is-loading' : ''}`}
          disabled={isDisabled(label, apogeeCode, description, error, loading)}
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
        >
         <FontAwesomeIcon
                  icon={faUndo}
                  style={{ marginRight: "0.5rem" }}
                />{" "}  Annuler
        </button>
      </div>
    </div>
  </form>
)

SubjectForm.propTypes = {
  modify: PropTypes.bool,
  label: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string
  }),
  apogeeCode: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string
  }),
  description: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string
  }),
  semester: PropTypes.shape({
    value: PropTypes.oneOf(['SEMESTER_1', 'SEMESTER_2', 'ANNUAL']),
    error: PropTypes.string
  }),
  capacity: PropTypes.shape({
    value: PropTypes.number.isRequired,
    error: PropTypes.string
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

SubjectForm.defaultProps = {
  modify: false,
  label: {
    value: '',
    error: null
  },
  apogeeCode: {
    value: '',
    error: null
  },
  description: {
    value: '',
    error: null
  },
  semester: {
    value: 'SEMESTER_1',
    error: null
  },
  capacity: {
    value: 0,
    error: null
  },
  loading: false,
  error: null,
  onChange: () => {},
  onFormSubmit: () => {},
  onCancel: () => {}
}

export default SubjectForm
