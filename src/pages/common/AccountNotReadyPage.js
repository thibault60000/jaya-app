import React from 'react'

import SmartLogoutButton from '../../containers/common/SmartLogoutButton'

function AccountNotReadyPage () {
  return (
    <div>
      <h1 className='title is-1'>Compte inactif</h1>
      <p>Ce compte n'a pas encore été validé par l'administrateur de la plateforme.</p>
      <SmartLogoutButton />
    </div>
  )
}

export default AccountNotReadyPage
