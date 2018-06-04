import React from 'react'
import SmartSubjectForm from './SmartSubjectForm'
import history from '../../routing/history'

export class SmartSubjectsAdd extends React.Component {
  _returnToList = () => history.push('/admin/subjects')

  render () {
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Ajout d'une matière</h3>
        <section>
          <SmartSubjectForm
            onSuccess={this._returnToList}
            onCancel={this._returnToList}
          />
        </section>
      </div>
    )
  }
}

export default SmartSubjectsAdd
