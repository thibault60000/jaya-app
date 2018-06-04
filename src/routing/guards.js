import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Moment from 'moment'
import 'moment-timezone'

import { Loading } from '../components'

/**
 * Only display a component if the right type of user is connected
 */
export function withUserTypeGuard (Component, redirectTo, userType) {
  return connect(
    state => ({
      loggedIn: state.auth.userType === userType,
      isVerified: state.auth.isVerified
    }),
    null
  )(({ loggedIn, isVerified, ...props }) => {
    if (loggedIn && isVerified) {
      return (<Component {...props} />)
    } else if (loggedIn && !isVerified) {
      return (<Redirect to='/account-not-activated' />)
    } else {
      return (<Redirect to={redirectTo} />)
    }
  })
}

/**
 * Only display a component if there is not connected user
 */
export function withAnonymousGuard (Component) {
  return connect(
    state => ({
      userType: state.auth.userType
    }),
    null
  )(({ userType, ...props }) => {
    if (userType === null) {
      return (<Component {...props} />)
    } else {
      let url
      switch (userType) {
        case 'STUDENT':
          url = '/student/home'
          break
        case 'PROFESSOR':
          url = '/professor/home'
          break
        case 'ADMIN':
          url = '/admin/home'
          break
      }
      return (<Redirect to={url} />)
    }
  })
}

export function withChoicesDateGuard (Component) {
  return connect(
    state => ({
      userSpecialization: state.auth.info.specialization
    }),
    null
  )(
    class extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          loading: true,
          currentDate: Moment.tz(Date.now(), 'Europe/Paris').format(),
          semester: null
        }
      }

      componentDidMount () {
        this._checkDates()
      }

      render () {
        const { semester, loading } = this.state
        return (
          <React.Fragment>
            {loading ? <Loading /> : (
              <React.Fragment>
                {semester != null ? <Component semester={semester} /> : <Redirect to={{
                  pathname: '/student/choices-closed'
                }} />}
              </React.Fragment>
            )}
          </React.Fragment>
        )
      }

      _checkDates = () => {
        const {
          openingChoiceDateS1,
          closingChoiceDateS1,
          openingChoiceDateS2,
          closingChoiceDateS2
        } = this.props.userSpecialization

        const currentDate = Moment(this.state.currentDate)

        if (currentDate.isAfter(Moment(openingChoiceDateS1)) && currentDate.isBefore(Moment(closingChoiceDateS1))) {
          this.setState({
            semester: 'SEMESTER_1',
            loading: false
          })
        }

        if (currentDate.isAfter(Moment(openingChoiceDateS2)) && currentDate.isBefore(Moment(closingChoiceDateS2))) {
          this.setState({
            semester: 'SEMESTER_2',
            loading: false
          })
        }

        this.setState({ loading: false })
      }
    }
  )
}
