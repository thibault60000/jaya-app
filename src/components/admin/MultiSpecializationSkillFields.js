import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import SkillDropdown from '../common/SkillDropdown'

function MultiSpecializationSkillFields ({
  items,
  usedIds,
  onChange,
  onAddSkillClick,
  onRemoveSkillClick
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
          <SkillDropdown
            selectedItem={value[key].skill}
            filterList={sk => !map(value, 'skill').reduce((all, s) => s != null ? [...all, s.id] : all, [...usedIds]).includes(sk.id)}
            onChange={(item) => onChange({
              target: {
                key,
                name: 'skills',
                value: {
                  name: 'skill',
                  data: item
                }
              }
            })}
          />

          <div className='field'>
            <label className='label'>Nombre d'UE optionnelles</label>
            <div className='control'>
              <input
                type='number'
                className='input'
                placeholder='5'
                onChange={(evt) => onChange({
                  target: {
                    key,
                    name: 'skills',
                    value: {
                      name: 'optionalSubjectsNb',
                      data: evt.target.value
                    }
                  }
                })}
                value={value[key].optionalSubjectsNb}
              />
            </div>
          </div>

          <button
            className='button is-primary'
            onClick={onAddSkillClick}
            type='button'
          >
            +
          </button>

          <button
            className='button is-primary'
            onClick={() => onRemoveSkillClick(key)}
            type='button'
          >
            -
          </button>
        </div>
      ))}
    </div>
  )
}

MultiSpecializationSkillFields.propTypes = {
  items: PropTypes.shape({
    /**
     * Object with dynamic keys here
     * e.g: {
     *   skill1: {
     *     skill: null,
     *     optionalSubjectsNb: 0,
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
  onAddSkillClick: PropTypes.func.isRequired,
  onRemoveSkillClick: PropTypes.func.isRequired
}

MultiSpecializationSkillFields.defaultProps = {
  usedIds: [],
  onChange: (evt) => console.warn('changed', evt),
  onAddSkillClick: () => console.warn('Add skill not binded'),
  onRemoveSkillClick: key => console.warn(`Remove skill ${key} not binded`)
}

export default MultiSpecializationSkillFields
