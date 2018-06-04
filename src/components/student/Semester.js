import React from 'react'
import PropTypes from 'prop-types'

import Subject from './Subject'

function Semester ({
  mandatories,
  optionals,
  specialization
}) {
  return (
    <React.Fragment>
      <h3 className='title is-3'>UE Obligatoires</h3>
      {mandatories.map(skill => (
        <li key={skill.id}>
          <h2>{skill.label}</h2>
          {skill.subjects.map(subject =>
            <Subject key={subject.id} subject={subject} />
          )}
        </li>
      ))}
      <h3 className='title is-3'>UE Optionelles</h3>
      {optionals.map(skill => (
        <li key={skill.id}>
          <h2>{skill.label}</h2>
          {skill.subjects.map(subject =>
            <Subject key={subject.id} subject={subject} />
          )}
        </li>
      ))}
    </React.Fragment>
  )
}

export default Semester

Semester.propTypes = {
  specialization: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    schoolYear: PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    })
  }),
  mandatories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      subjects: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          description: PropTypes.string
        })
      )
    })
  ),
  optionals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      subjects: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          description: PropTypes.string
        })
      )
    })
  )
}
