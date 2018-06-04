import React from 'react'

import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartAdminOptionalsHome from '../../containers/admin/SmartAdminOptionalsHome'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'

function AdminOptionalsPage () {
  return (
    <div className='adminColors'>
      <SmartSideBar />
      <div className='homeContainer'>
        <SmartIdentityContent />
        <SmartAdminOptionalsHome />
      </div>
    </div>
  )
}

export default AdminOptionalsPage
