import React from 'react'

import history from '../../routing/history'
import SmartGroupForm from './SmartGroupForm'

class SmartGroupsAdd extends React.Component {
  render () {
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Ajout d'un groupe d'étudiant</h3>
        <section>
          <SmartGroupForm
            onSuccess={this._returnToList}
            onCancel={this._returnToList}
          />
        </section>
      </div>
    )
  }

  _returnToList = () => history.push('/admin/groups')
}

export default SmartGroupsAdd
