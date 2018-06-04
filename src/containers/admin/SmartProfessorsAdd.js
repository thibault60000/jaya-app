import React from 'react'

import SmartProfessorForm from './SmartProfessorForm'
import history from '../../routing/history'

class SmartProfessorsAdd extends React.Component {
  render () {
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem' }}>
        <h3 className='title is-3'>Ajout d'un professeur</h3>
        <section>
          <SmartProfessorForm
            onSuccess={this._returnToList}
            onCancel={this._returnToList}
          />
        </section>
      </div>
    )
  }

  _returnToList = () => history.push('/admin/professors')
}

export default SmartProfessorsAdd
