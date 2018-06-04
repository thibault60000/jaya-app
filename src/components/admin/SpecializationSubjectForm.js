import React from 'react'
import PropTypes from 'prop-types'

import MultiSpecializationSubjectField from './MultiSpecializationSubjectField'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faUndo from "@fortawesome/fontawesome-free-solid/faUndo";

function emptySubjects (subjects) {
  return subjects.error != null ||
    Object.keys(subjects.value).length === 0 ||
    Object.keys(subjects.value).reduce((all, key) => all || (subjects.value[key].skill == null || subjects.value[key].subject == null), false)
}

const SpecializationSubjectForm = ({
  specializationSubjectsId,
  onFormSubmit,
  onChange,
  onCancel,
  error,
  loading,
  subjects,
  onAddSubjectClick,
  onRemoveSubjectClick
}) => (
  <form onSubmit={onFormSubmit}>
    <MultiSpecializationSubjectField
      usedIds={specializationSubjectsId}
      onChange={onChange}
      items={subjects}
      onAddSubjectClick={onAddSubjectClick}
      onRemoveSubjectClick={onRemoveSubjectClick}
    />
    <div className='field'>
      <div className='control'>
        <button
          className='button is-primary'
          type='button'
          onClick={onAddSubjectClick}
        >
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter une matière
        </button>
      </div>
    </div>

    <div className='field'>
      <div className='control'>
        <button
          className={`button is-primary ${loading ? 'is-loading' : ''}`}
          disabled={loading || emptySubjects(subjects)}
          type='submit'
        >
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter
        </button>
        <button
          className='button'
          disabled={loading}
          onClick={onCancel}
          type='button'
        >
          <FontAwesomeIcon icon={faUndo} style={{ marginRight: '0.5rem' }} /> Annuler
        </button>
      </div>
    </div>
  </form>
)

SpecializationSubjectForm.propTypes = {
  subjects: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  specializationSubjectsId: PropTypes.arrayOf(PropTypes.string),
  onAddSubjectClick: PropTypes.func.isRequired,
  onRemoveSubjectClick: PropTypes.func.isRequired
}

SpecializationSubjectForm.defaultProps = {
  subjects: {
    value: {
      subject1: {
        skill: null,
        subject: null,
        isOptional: false
      }
    },
    error: null
  },
  specializationSubjectsId: [],
  loading: false,
  error: null,
  onChange: () => {},
  onFormSubmit: () => {},
  onCancel: () => {}
}

export default SpecializationSubjectForm
