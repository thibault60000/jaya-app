import React from 'react'
import { DashboardAdmin } from '../../components'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'

const AdminHomePage = () => (
  <div className='adminColors'>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <DashboardAdmin />
    </div>
  </div>
)

export default AdminHomePage
