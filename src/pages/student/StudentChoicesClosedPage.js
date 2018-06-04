import React from 'react'

import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartSideBar from '../../containers/common/SmartSideBar'

function StudentChoicesClosedPage ({ location }) {
  return (
    <div>
      <SmartSideBar />
      <div className='homeContainer'>
        <SmartIdentityContent />
        <div style={{ padding: '2rem' }}>
          <h4 className='title is-4'>Le choix des UE n'est pas accessible actuellement.</h4>
          <p>Les dates d'ouverture et de fermeture vous seront communiquées par mail.</p>
        </div>
      </div>
    </div>
  )
}

export default StudentChoicesClosedPage
