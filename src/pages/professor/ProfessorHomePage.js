import React from 'react'
import { Link } from 'react-router-dom'
import SmartSideBar from '../../containers/common/SmartSideBar'
import SmartIdentityContent from '../../containers/common/SmartIdentityContent'
import SmartTeachingSummary from '../../containers/professor/SmartTeachingSummary'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'

const ProfessorHomePage = () => (
  <div>
    <SmartSideBar />
    <div className='homeContainer'>
      <SmartIdentityContent />
      <div className='container' style={{ paddingTop: '2rem', paddingLeft: '1.5rem' }}>
        <div className='columns is-multiline'>
          <div className='column is-12'>
            <h1 className='title is-2'>Vos cours de l'année</h1>
          </div>
          <div className='column is-12 has-text-centered'>
            <SmartTeachingSummary />
          </div>
          <div className='column is-12'>
            <Link to='/professor/subject/add'>
              <button className='button is-primary'><FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '0.5rem' }} /> Ajouter un cours</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProfessorHomePage
