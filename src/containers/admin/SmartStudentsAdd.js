import React from 'react'

import SmartStudentsForm from './SmartStudentsForm'
import history from '../../routing/history'

class SmartStudentsAdd extends React.Component {
  render () {
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem' }}>
        <h3 className='title is-3'>Ajout d'un étudiant</h3>
        <section>
          <SmartStudentsForm
            onSuccess={this._returnToList}
            onCancel={this._returnToList}
          />
        </section>
      </div>
    )
  }

  _returnToList = () => history.push('/admin/students')
}

export default SmartStudentsAdd
