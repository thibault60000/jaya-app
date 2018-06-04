import React from 'react'
import { Switch, Route } from 'react-router'

import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartSpecializationsHome from '../../containers/admin/SmartSpecializationsHome'
import SmartSpecializationsAdd from '../../containers/admin/SmartSpecializationsAdd'
import SmartSpecializationsModify from '../../containers/admin/SmartSpecializationsModify'
import SmartSpecializationsDetails from '../../containers/admin/SmartSpecializationsDetails'
import SmartSpecializationSubjectAdd from '../../containers/admin/SmartSpecializationSubjectAdd'
import SmartSpecializationSkillAdd from '../../containers/admin/SmartSpecializationSkillAdd'

const AdminSpecializationsRouter = () => (
  <div className='adminColors'>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <Switch>
        <Route exact path='/admin/specializations' component={SmartSpecializationsHome} />
        <Route exact path='/admin/specializations/add' component={SmartSpecializationsAdd} />
        <Route exact path='/admin/specializations/:id' component={SmartSpecializationsDetails} />
        <Route exact path='/admin/specializations/modify/:id' component={SmartSpecializationsModify} />
        <Route exact path='/admin/specializations/subjects/add/:id' component={SmartSpecializationSubjectAdd} />
        <Route exact path='/admin/specializations/skills/add/:id' component={SmartSpecializationSkillAdd} />
      </Switch>
    </div>
  </div>
)

export default AdminSpecializationsRouter
