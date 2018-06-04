import './styles/theme.scss'
import React from 'react'
import ReactDOM from 'react-dom'

import 'babel-polyfill'

import 'font-awesome/css/font-awesome.min.css'

function startApp () {
  const App = require('./App').default
  ReactDOM.render(
    <App />,
    document.querySelector('#main')
  )
}

startApp()

if (module.hot) {
  module.hot.accept(startApp)
}
