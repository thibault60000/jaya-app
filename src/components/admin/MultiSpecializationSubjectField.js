import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import SkillDropdown from '../common/SkillDropdown'
import SubjectDropdown from '../common/SubjectDropdown'

function MultiSpecializationSubjectFields ({
  items,
  usedIds,
  onChange,
  onAddSubjectClick,
  onRemoveSubjectClick
}) {
  const { value } = items

  return (
    <div className="buttonMultiSpecialization">
      {Object.keys(value).map(key => (
        <div
          key={key}
          id={key}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          <SubjectDropdown
            selectedItem={value[key].subject}
            filterPredicat={sb => !map(value, 'subject').reduce((all, s) => s != null ? [...all, s.id] : all, [...usedIds]).includes(sb.id)}
            onChange={(item) => onChange({
              target: {
                key,
                name: 'subjects',
                value: {
                  name: 'subject',
                  data: item
                }
              }
            })}
          />

          <SkillDropdown
            selectedItem={value[key].skill}
            onChange={(item) => onChange({
              target: {
                key,
                name: 'subjects',
                value: {
                  name: 'skill',
                  data: item
                }
              }
            })}
          />

          <div className='field checkboxOption'>
            <div className='control'>
              <label className='label'>
                <input
                  type='checkbox'
                  onChange={(evt) => onChange({
                    target: {
                      key,
                      name: 'subjects',
                      value: {
                        name: 'isOptional',
                        data: evt.target.checked
                      }
                    }
                  })}
                  checked={value[key].isOptional}
                />
                En option
              </label>
            </div>
          </div>

          <button
            className='button is-primary'
            onClick={onAddSubjectClick}
            type='button'
          >
            +
          </button>

          <button
            className='button is-primary'
            onClick={() => onRemoveSubjectClick(key)}
            type='button'
          >
            -
          </button>
        </div>
      ))}
    </div>
  )
}

MultiSpecializationSubjectFields.propTypes = {
  items: PropTypes.shape({
    /**
     * Object with dynamic keys herer
     * e.g: {
     *   subject1: {
     *     skill: null,
     *     subject: null,
     *     isOptional: false
     *   }
     * }
     */
    value: PropTypes.object,
    error: PropTypes.shape({
      key: PropTypes.string,
      error: PropTypes.string
    })
  }),
  usedIds: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onAddSubjectClick: PropTypes.func.isRequired,
  onRemoveSubjectClick: PropTypes.func.isRequired
}

MultiSpecializationSubjectFields.defaultProps = {
  usedIds: [],
  onChange: (evt) => console.warn('changed', evt),
  onAddSubjectClick: () => console.warn('Add subject not binded'),
  onRemoveSubjectClick: key => console.warn(`Remove subject ${key} not binded`)
}

export default MultiSpecializationSubjectFields
