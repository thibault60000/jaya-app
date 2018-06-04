import React from 'react'
import SmartSkillsForm from './SmartSkillsForm'
import history from '../../routing/history'

export class SmartSkillsAdd extends React.Component {
  _returnToList = () => history.push('/admin/skills')

  render () {
    return (
      <div style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingBottom: '3rem' }}>
        <h3 className='title is-3'>Ajout d'une compétence</h3>
        <section>
          <SmartSkillsForm
            onSuccess={this._returnToList}
            onCancel={this._returnToList}
          />
        </section>
      </div>
    )
  }
}

export default SmartSkillsAdd
