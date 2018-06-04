import React from 'react'
import SmartSpecializationForm from './SmartSpecializationForm'
import history from '../../routing/history'

export class SmartSpecializationsAdd extends React.Component {
  _returnToList = () => history.push('/admin/specializations')

  render () {
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Ajout d'un parcours</h3>
        <section>
          <SmartSpecializationForm
            onSuccess={this._returnToList}
            onCancel={this._returnToList}
          />
        </section>
      </div>
    )
  }
}

export default SmartSpecializationsAdd
