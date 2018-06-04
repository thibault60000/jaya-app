import React from 'react'

import SmartSemester from './SmartSemester'
import { YearSummary } from '../../components'

function SmartYearSummary () {
  return (
    <YearSummary
      semester1Component={<SmartSemester specializationSemester='SEMESTER_1' />}
      semester2Component={<SmartSemester specializationSemester='SEMESTER_2' />}
      annualComponent={<SmartSemester specializationSemester='ANNUAL' />}
    />
  )
}

export default SmartYearSummary
