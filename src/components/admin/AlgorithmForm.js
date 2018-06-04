import React from 'react'
import PropTypes from 'prop-types'

import SchoolYearDropdown from '../common/SchoolYearDropdown'

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCode from "@fortawesome/fontawesome-free-solid/faCode";
import faShare from "@fortawesome/fontawesome-free-solid/faShare"

function isDisabled (schoolYear, semester, error, loading) {
  return loading || error != null ||
    semester.value == null || semester.error != null ||
    schoolYear.value == null || schoolYear.error != null
}

export function AlgorithmForm ({
  schoolYear,
  semester,
  loading,
  error,
  onChange,
  onFormSubmit
}) {
  return (
    <form onSubmit={onFormSubmit}>
      <SchoolYearDropdown
        label='Année'
        onChange={(item) => onChange({
          target: {
            name: 'schoolYear',
            value: item
          }
        })}
        selectedItem={schoolYear.value}
      />

      <div className='field'>
        <label htmlFor='semester' className='label'>Semestre</label>
        <div className='control'>
          <div className='select parentSelectAlgo'>
            <select
              onChange={onChange}
              name='semester'
              value={semester.value}
              className="selectAlgorithme"
              required
            >
              <option value='SEMESTER_1'>Semestre 1</option>
              <option value='SEMESTER_2'>Semestre 2</option>
            </select>
          </div>
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <button
            className={`button is-primary ${loading ? 'is-loading' : ''}`}
            disabled={isDisabled(schoolYear, semester, error, loading)}
            type='submit'
          >
            <FontAwesomeIcon icon={faCode} style={{ marginRight: '0.5rem' }} /> Lancer l'algorithme
          </button>
        </div>
      </div>
    </form>
  )
}

AlgorithmForm.propTypes = {
  semester: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  schoolYear: PropTypes.shape({
    value: PropTypes.object,
    error: PropTypes.string
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func
}

AlgorithmForm.defaultProps = {
  schoolYear: {
    value: null,
    error: null
  },
  semester: {
    value: 'SEMESTER_1',
    error: null
  },
  loading: false,
  error: null,
  onChange: () => {},
  onFormSubmit: () => {}
}

export default AlgorithmForm
