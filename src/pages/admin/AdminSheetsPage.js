import React from 'react'

import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartAdminSheetsHome from '../../containers/admin/SmartAdminSheetsHome'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'

function AdminSheetsPage () {
  return (
    <div className='adminColors'>
      <SmartSideBar />
      <div className='homeContainer'>
        <SmartIdentityContent />
        <SmartAdminSheetsHome />
      </div>
    </div>
  )
}

export default AdminSheetsPage
