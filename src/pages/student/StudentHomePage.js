import React from 'react'
import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartYearSummary from '../../containers/student/SmartYearSummary'

const StudentHomePage = () => (
  <div>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <SmartYearSummary />
    </div>
  </div>
)

export default StudentHomePage
