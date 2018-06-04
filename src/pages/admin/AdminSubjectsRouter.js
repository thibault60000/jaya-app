import React from 'react'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartSubjectsHome from '../../containers/admin/SmartSubjectsHome'
import SmartSubjectsAdd from '../../containers/admin/SmartSubjectsAdd'
import SmartSubjectsModify from '../../containers/admin/SmartSubjectsModify'
import { Switch, Route } from 'react-router'

const AdminSubjectsRouter = () => (
  <div className='adminColors'>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <Switch>
        <Route exact path='/admin/subjects' component={SmartSubjectsHome} />
        <Route exact path='/admin/subjects/add' component={SmartSubjectsAdd} />
        <Route exact path='/admin/subjects/modify/:id' component={SmartSubjectsModify} />
      </Switch>
    </div>
  </div>
)

export default AdminSubjectsRouter
