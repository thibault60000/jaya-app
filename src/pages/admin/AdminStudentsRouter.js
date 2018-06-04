import React from 'react'
import { Switch, Route } from 'react-router'

import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartStudentsHome from '../../containers/admin/SmartStudentsHome'
import SmartStudentsAdd from '../../containers/admin/SmartStudentsAdd'
import SmartStudentsModify from '../../containers/admin/SmartStudentsModify'

function AdminStudentsRouter () {
  return (
    <div className='adminColors'>
      <SmartSideBar />
      <div className='homeContainer'>
        <SmartIdentityContent />
        <Switch>
          <Route exact path='/admin/students' component={SmartStudentsHome} />
          <Route exact path='/admin/students/add' component={SmartStudentsAdd} />
          <Route exact path='/admin/students/modify/:id' component={SmartStudentsModify} />
        </Switch>
      </div>
    </div>
  )
}

export default AdminStudentsRouter
