import React from 'react'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartSkillsHome from '../../containers/admin/SmartSkillsHome'
import { Switch, Route } from 'react-router'
import SmartSkillsAdd from '../../containers/admin/SmartSkillsAdd'
import SmartSkillsModify from '../../containers/admin/SmartSkillsModify'

const AdminSpecializationsRouter = () => (
  <div className='adminColors'>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <Switch>
        <Route exact path='/admin/skills' component={SmartSkillsHome} />
        <Route exact path='/admin/skills/add' component={SmartSkillsAdd} />
        <Route exact path='/admin/skills/modify/:id' component={SmartSkillsModify} />
      </Switch>
    </div>
  </div>
)

export default AdminSpecializationsRouter
