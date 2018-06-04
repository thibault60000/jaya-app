import React from 'react'

const TeachingSummary = ({
  professorSubjects = []
}) => (
  <table className='table'>
    <thead>
      <tr>
        <th>UE</th>
        <th>Heures de cours</th>
        <th>Heures de TD (par groupe)</th>
      </tr>
    </thead>
    <tbody>
      {
        professorSubjects.map(ps => (
          <tr key={ps.specializationLabel}>
            <td>{ps.specializationLabel}</td>
            <td>{ps.lectureHours}</td>
            <td>{ps.tutorialHours}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default TeachingSummary
