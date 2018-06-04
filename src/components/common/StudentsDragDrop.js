import React from 'react'
import PropTypes from 'prop-types'

function StudentItem ({
  id,
  firstName,
  lastName,
  specialization,
  onDragStart
}) {
  return (
    <li
      id={`student${id}`}
      draggable
      onDragStart={onDragStart}
    >
      {lastName.toUpperCase()} {firstName} <br />
      <strong>{specialization.label}</strong>
    </li>
  )
}

StudentItem.propTypes = {
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  specialization: PropTypes.shape({
    label: PropTypes.string
  }),
  onDragStart: PropTypes.func
}

class StudentsDragDrop extends React.Component {
  static propTypes = {
    remainingStudents: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      specialization: PropTypes.shape({
        label: PropTypes.string
      })
    })),
    groupStudents: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      specialization: PropTypes.shape({
        label: PropTypes.string
      })
    })),
    onDrag: PropTypes.func,
    onDrop: PropTypes.func
  }

  static defaultProps = {
    remainingStudents: [],
    groupStudents: []
  }

  render () {
    const {
      remainingStudents,
      groupStudents,
      onDrag,
      onDrop
    } = this.props

    return (
      <div
        className='columns studentDrag'
      >
        <div className='column is-half studentDrag_container'>
          <h4>Liste d'étudiants</h4>
          <ul
            className='studentDrag_list'
            onDragOver={this._allowDrop}
            onDrop={onDrop}
          >
            {remainingStudents.map((student) =>
              <StudentItem
                key={student.id}
                onDragStart={(e) => onDrag(e, student)}
                {...student}
              />
            )}
          </ul>
        </div>
        <div className='column is-half studentDrag_container'>
          <h4>Étudiants dans le groupe</h4>
          <ul
            className='studentDrag_list'
            onDragOver={this._allowDrop}
            onDrop={onDrop}
          >
            {groupStudents.map((student) =>
              <StudentItem
                key={student.id}
                onDragStart={(e) => onDrag(e, student)}
                {...student}
              />
            )}
          </ul>
        </div>
      </div>
    )
  }

  _allowDrop = evt => {
    evt.preventDefault()
  }
}

export default StudentsDragDrop
