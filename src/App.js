import React from 'react'
import history from './routing/history'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import Router from './routing/Router'
import reducers from './reducers'
import epics from './epics'
import environment from './environment'

class App extends React.Component {
  store;
  middlewares = [];

  constructor () {
    super()
    this.middlewares = environment.development ? [
      routerMiddleware(history),
      createEpicMiddleware(epics),
      logger
    ] : [
      routerMiddleware(this.history),
      createEpicMiddleware(epics)
    ]
    this.store = createStore(
      reducers,
      applyMiddleware(...this.middlewares)
    )
  }

  render () {
    return (
      <Provider store={this.store}>
        <Router history={history} />
      </Provider>
    )
  }
}

export default App
