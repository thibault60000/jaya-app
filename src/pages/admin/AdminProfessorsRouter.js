import React from 'react'
import { Switch, Route } from 'react-router'

import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartProfessorsHome from '../../containers/admin/SmartProfessorsHome'
import SmartProfessorsAdd from '../../containers/admin/SmartProfessorsAdd'
import SmartProfessorsModify from '../../containers/admin/SmartProfessorsModify'

const AdminProfessorsRouter = () => (
  <div className='adminColors'>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <Switch>
        <Route exact path='/admin/professors' component={SmartProfessorsHome} />
        <Route exact path='/admin/professors/add' component={SmartProfessorsAdd} />
        <Route exact path='/admin/professors/modify/:id' component={SmartProfessorsModify} />
      </Switch>
    </div>
  </div>
)

export default AdminProfessorsRouter
