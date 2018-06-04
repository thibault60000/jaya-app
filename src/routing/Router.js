import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import { withAnonymousGuard, withUserTypeGuard, withChoicesDateGuard } from './guards'
import * as Common from '../pages/common'
import * as Student from '../pages/student'
import * as Admin from '../pages/admin'
import * as Professor from '../pages/professor'

const Router = ({ history, ready }) => (
  <React.Fragment>
    <ConnectedRouter history={history}>
      { ready ? (
        <Switch>
          <Route exact path='/' component={withAnonymousGuard(Common.HomePage)} />

          {/* Register router */}
          <Route path='/signup'
            component={withAnonymousGuard(() =>
              <React.Fragment>
                <Route exact path='/signup/student' component={Student.StudentRegisterPage} />
                <Route exact path='/signup/professor' component={Professor.ProfessorRegisterPage} />
              </React.Fragment>
            )}
          />

          { /* Connection router */ }
          <Route path='/connection'
            component={withAnonymousGuard(() =>
              <React.Fragment>
                <Route exact path='/connection/admin' component={Admin.AdminConnectionPage} />
                <Route exact path='/connection/student' component={Student.StudentConnectionPage} />
                <Route exact path='/connection/professor' component={Professor.ProfessorConnectionPage} />
              </React.Fragment>
            )}
          />

          { /* Student router */ }
          <Route path='/student'
            component={withUserTypeGuard(
              () =>
                <React.Fragment>
                  <Route exact path='/student/home' component={Student.StudentHomePage} />
                  <Route exact path='/student/choices' component={withChoicesDateGuard(Student.StudentSubjectChoicePage)} />
                  <Route exact path='/student/choices-closed' component={Student.StudentChoicesClosedPage} />
                </React.Fragment>
              ,
              '/forbidden',
              'STUDENT'
            )}
          />

          { /* Professor router */ }
          <Route path='/professor'
            component={withUserTypeGuard(
              () =>
                <React.Fragment>
                  <Route exact path='/professor/home' component={Professor.ProfessorHomePage} />
                  <Route exact path='/professor/subject/add' component={Professor.ProfessorSubjectAddPage} />
                </React.Fragment>
              ,
              '/forbidden',
              'PROFESSOR'
            )}
          />

          { /* Admin router */ }
          <Route path='/admin'
            component={withUserTypeGuard(
              () =>
                <React.Fragment>
                  <Route exact path='/admin/home' component={Admin.AdminHomePage} />
                  <Route exact path='/admin/sheets' component={Admin.AdminSheetsPage} />
                  <Route exact path='/admin/optionals' component={Admin.AdminOptionalsPage} />
                  <Route path='/admin/specializations' component={Admin.AdminSpecializationsRouter} /> { /* Subrouter here */ }
                  <Route path='/admin/skills' component={Admin.AdminSkillsRouter} /> { /* Subrouter here */ }
                  <Route path='/admin/subjects' component={Admin.AdminSubjectsRouter} /> { /* Subrouter here */ }
                  <Route path='/admin/students' component={Admin.AdminStudentsRouter} /> { /* Subrouter here */}
                  <Route path='/admin/professors' component={Admin.AdminProfessorsRouter} /> { /* Subrouter here */}
                  <Route path='/admin/groups' component={Admin.AdminGroupsRouter} /> { /* Subrouter here */}
                </React.Fragment>
              ,
              '/forbidden',
              'ADMIN'
            )}
          />

          {/* Other routes TODO: CLASSIFY THESE ROUTES */}
          <Route exact path='/resetpwd' component={Common.PasswordResetPage} />
          <Route exact path='/changepassword' component={Common.ChangePasswordPage} />

          <Route exact path='/forbidden' component={Common.ForbiddenPage} />
          <Route exact path='/error' component={Common.ErrorPage} />
          <Route exact path='/account-not-activated' component={Common.AccountNotReadyPage} />
          <Route component={Common.NotFoundPage} />
        </Switch>
      ) : (
        <div className='container'>
          <h1 className='title is-1 has-text-centered has-text-white' style={{ paddingTop: '5rem' }}>Chargement...</h1>
        </div>
      )}
    </ConnectedRouter>

  </React.Fragment>
)

Router.propTypes = {
  history: PropTypes.any.isRequired,
  ready: PropTypes.bool.isRequired
}

export default connect(state => ({ ready: state.global.appReady }), null)(Router)
