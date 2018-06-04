import React from 'react'
import PropTypes from 'prop-types'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faUndo from "@fortawesome/fontawesome-free-solid/faUndo";

function isDisabled (label, error, loading) {
  return loading || error != null ||
    label.value == null || label.value.length === 0 || label.error != null
}

const SkillForm = ({
  modify,
  label,
  error,
  onChange,
  onFormSubmit,
  onCancel,
  loading
}) => (
  <form onSubmit={onFormSubmit}>
    <div className='field'>
      <label htmlFor='label' className='label'>Nom de la compétence</label>
      <div className='control'>
        <input
          className='input'
          type='text'
          placeholder='Gestion'
          name='label'
          value={label.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <div className='control'>
        <button
          className={`button is-primary ${loading ? 'is-loading' : ''}`}
          disabled={isDisabled(label, error, loading)}
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
                />{" "} Annuler
        </button>
      </div>
    </div>
  </form>
)

SkillForm.propTypes = {
  modify: PropTypes.bool,
  label: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

SkillForm.defaultProps = {
  modify: false,
  label: {
    value: '',
    error: null
  },
  loading: false,
  error: null,
  onChange: () => {},
  onFormSubmit: () => {},
  onCancel: () => {}
}

export default SkillForm
