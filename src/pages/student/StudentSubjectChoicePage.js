import React from 'react'
import SmartSubjectsSelector from '../../containers/student/SmartSubjectsSelector'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'

const StudentSubjectChoicePage = (props) => (
  <div>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <SmartSubjectsSelector {...props} />
    </div>
  </div>
)

export default StudentSubjectChoicePage
