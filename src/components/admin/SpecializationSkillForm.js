import React from 'react'
import PropTypes from 'prop-types'

import MultiSpecializationSkillFields from './MultiSpecializationSkillFields'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faUndo from "@fortawesome/fontawesome-free-solid/faUndo";

function emptySkills (skills) {
  return skills.error != null ||
    Object.keys(skills.value).length === 0 ||
    Object.keys(skills.value).reduce((all, key) => all || (skills.value[key].skill == null) || (skills.value[key].optionalSubjectsNb <= 0), false)
}

export function SpecializationSkillForm ({
  specializationSkillsId,
  onFormSubmit,
  onChange,
  onCancel,
  error,
  loading,
  skills,
  onAddSkillClick,
  onRemoveSkillClick
}) {
  return (
    <form onSubmit={onFormSubmit}>
      <MultiSpecializationSkillFields
        usedIds={specializationSkillsId}
        items={skills}
        onChange={onChange}
        onAddSkillClick={onAddSkillClick}
        onRemoveSkillClick={onRemoveSkillClick}
      />

      <div className='field'>
        <div className='control'>
          <button
            className='button is-primary'
            type='button'
            onClick={onAddSkillClick}
          >
            <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} />  Ajouter une compétence
          </button>
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <button
            className={`button is-primary ${loading ? 'is-loading' : ''}`}
            disabled={loading || emptySkills(skills)}
            type='submit'
          >
            <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} />  Ajouter
          </button>
          <button
            className='button'
            disabled={loading}
            onClick={onCancel}
            type='button'
          >
            <FontAwesomeIcon icon={faUndo} style={{ marginRight: '0.5rem' }} />  Annuler
          </button>
        </div>
      </div>
    </form>
  )
}

SpecializationSkillForm.propTypes = {
  skills: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  specializationSkillsId: PropTypes.arrayOf(PropTypes.string),
  onAddSkillClick: PropTypes.func.isRequired,
  onRemoveSkillClick: PropTypes.func.isRequired
}

SpecializationSkillForm.defaultProps = {
  skills: {
    value: {
      skill1: {
        skill: null,
        optionalSubjectsNb: 0
      }
    },
    error: null
  },
  specializationSkillsId: [],
  loading: false,
  error: null,
  onChange: () => {},
  onFormSubmit: () => {},
  onCancel: () => {}
}

export default SpecializationSkillForm
