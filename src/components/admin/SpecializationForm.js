import React from 'react'
import PropTypes from 'prop-types'

import SchoolYearDropdown from '../common/SchoolYearDropdown'
import MultiSpecializationSubjectField from './MultiSpecializationSubjectField'
import MultiSpecializationSkillFields from './MultiSpecializationSkillFields'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faUndo from "@fortawesome/fontawesome-free-solid/faUndo";

function isDisabled (modify, label, acronym, schoolYear, error, loading, subjects) {
  return loading || error != null ||
    label.value == null || label.value.length === 0 || label.error != null ||
    acronym.value == null || acronym.value.length === 0 || acronym.error != null ||
    schoolYear.value == null || schoolYear.error != null
}

function emptySubjects (subjects) {
  return subjects.error != null ||
    Object.keys(subjects.value).length === 0 ||
    Object.keys(subjects.value).reduce((all, key) => all || (subjects.value[key].skill == null || subjects.value[key].subject == null), false)
}

function emptySkills (skills) {
  return skills.error != null ||
    Object.keys(skills.value).length === 0 ||
    Object.keys(skills.value).reduce((all, key) => all || (skills.value[key].skill == null || skills.value[key].optionalSubjectsNb === 0), false)
}

const SpecializationForm = ({
  modify,
  label,
  acronym,
  schoolYear,
  openingChoiceDateS1,
  closingChoiceDateS1,
  openingChoiceDateS2,
  closingChoiceDateS2,
  subjects,
  skills,
  error,
  onChange,
  onFormSubmit,
  onCancel,
  loading,
  onAddSubjectClick,
  onRemoveSubjectClick,
  onAddSkillClick,
  onRemoveSkillClick
}) => (
  <form onSubmit={onFormSubmit}>
    <div className='field'>
      <label htmlFor='label' className='label'>Nom de la formation</label>
      <div className='control'>
        <input
          className='input'
          type='text'
          placeholder='Master 1 MIAGE'
          name='label'
          value={label.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label htmlFor='acronym' className='label'>Acronyme</label>
      <div className='control'>
        <input
          className='input'
          type='text'
          placeholder='MIAGE'
          name='acronym'
          value={acronym.value}
          onChange={onChange}
        />
      </div>
    </div>
    <SchoolYearDropdown
      label='Année scolaire'
      onChange={(item) => onChange({
        target: {
          name: 'schoolYear',
          value: item
        }
      })}
      selectedItem={schoolYear.value}
    />
    <div className='field'>
      <label htmlFor='openingChoiceDateS1' className='label'>Date d'ouverture des choix au S1</label>
      <div className='control'>
        <input
          className='input'
          type='datetime-local'
          name='openingChoiceDateS1'
          value={openingChoiceDateS1.value} // e.g. 2014-01-02T11:42:13.510
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label htmlFor='closingChoiceDateS1' className='label'>Date de fermeture des choix au S1</label>
      <div className='control'>
        <input
          className='input'
          type='datetime-local'
          name='closingChoiceDateS1'
          value={closingChoiceDateS1.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label htmlFor='openingChoiceDateS2' className='label'>Date d'ouverture des choix au S2</label>
      <div className='control'>
        <input
          className='input'
          type='datetime-local'
          name='openingChoiceDateS2'
          value={openingChoiceDateS2.value}
          onChange={onChange}
        />
      </div>
    </div>
    <div className='field'>
      <label htmlFor='closingChoiceDateS2' className='label'>Date de fermeture des choix au S2</label>
      <div className='control'>
        <input
          className='input'
          type='datetime-local'
          name='closingChoiceDateS2'
          value={closingChoiceDateS2.value}
          onChange={onChange}
        />
      </div>
    </div>
    {!modify &&
      <React.Fragment>
        <MultiSpecializationSkillFields
          onChange={onChange}
          items={skills}
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
              <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} />Ajouter des infos sur une compétence
            </button>
          </div>
        </div>
        <MultiSpecializationSubjectField
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
              <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} />Ajouter une matière
            </button>
          </div>
        </div>
      </React.Fragment>
    }
    <div className='field'>
      <div className='control'>
        <button
          className={`button is-primary ${loading ? 'is-loading' : ''}`}
          disabled={
            modify ? isDisabled(modify, label, acronym, schoolYear, error, loading)
              : isDisabled(modify, label, acronym, schoolYear, error, loading) || emptySubjects(subjects) || emptySkills(skills)
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
                  icon={faTrashAlt}
                  style={{ marginRight: "0.5rem" }}
                />{" "}
                Supprimer
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

SpecializationForm.propTypes = {
  modify: PropTypes.bool,
  label: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string
  }),
  acronym: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string
  }),
  openingChoiceDateS1: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  closingChoiceDateS1: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  openingChoiceDateS2: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  closingChoiceDateS2: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  schoolYear: PropTypes.shape({
    value: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }),
    error: PropTypes.string
  }),
  subjects: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onAddSubjectClick: PropTypes.func.isRequired,
  onRemoveSubjectClick: PropTypes.func.isRequired
}

SpecializationForm.defaultProps = {
  modify: false,
  label: {
    value: '',
    error: null
  },
  acronym: {
    value: '',
    error: null
  },
  schoolYear: {
    value: null,
    error: null
  },
  openingChoiceDateS1: {
    value: '',
    error: null
  },
  closingChoiceDateS1: {
    value: '',
    error: null
  },
  openingChoiceDateS2: {
    value: '',
    error: null
  },
  closingChoiceDateS2: {
    value: '',
    error: null
  },
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
  skills: {
    value: {
      skill1: {
        skill: null,
        optionalSubjectsNb: 0
      }
    },
    error: null
  },
  loading: false,
  error: null,
  onChange: () => {},
  onFormSubmit: () => {},
  onCancel: () => {}
}

export default SpecializationForm
