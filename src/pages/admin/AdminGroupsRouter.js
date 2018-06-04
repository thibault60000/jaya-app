import React from 'react'
import { Switch, Route } from 'react-router'

import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartGroupsHome from '../../containers/admin/SmartGroupsHome'
import SmartGroupsAdd from '../../containers/admin/SmartGroupsAdd'
import SmartGroupsModify from '../../containers/admin/SmartGroupsModify'

function AdminGroupsRouter () {
  return (
    <div className='adminColors'>
      <SmartSideBar />
      <div className='homeContainer'>
        <SmartIdentityContent />
        <Switch>
          <Route exact path='/admin/groups' component={SmartGroupsHome} />
          <Route exact path='/admin/groups/add' component={SmartGroupsAdd} />
          <Route exact path='/admin/groups/modify/:id' component={SmartGroupsModify} />
        </Switch>
      </div>
    </div>
  )
}

export default AdminGroupsRouter
