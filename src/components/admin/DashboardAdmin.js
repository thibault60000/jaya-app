import React from 'react'
import { Link } from 'react-router-dom'

import competences from '../../assets/img/competences.png'
import ue from '../../assets/img/ue.png'
import optio from '../../assets/img/optio.png'
import specialisation from '../../assets/img/specialisation.png'
import team from '../../assets/img/team.png'
import etudiants from '../../assets/img/etudiants.png'
import enseignants from '../../assets/img/teacher.png'
import emargement from '../../assets/img/emargement.png'

const DashboardAdmin = () => (
  <ul className='actionList' style={{paddingBottom: '2rem'}}>

    <li>
      <Link to='/admin/specializations'>
        <button type='button'>
          <img src={specialisation} />
          <span>Gestion des parcours</span>
        </button>
      </Link>
    </li>
    <li>
      <Link to='/admin/skills'>
        <button type='button'>
          <img src={competences} />
          <span>Gestion des compétences</span>
        </button>
      </Link>
    </li>
    <li>
      <Link to='/admin/subjects'>
        <button type='button'>
          <img src={ue} />
          <span>Gestion des UE</span>
        </button>
      </Link>
    </li>
    <li>
      <Link to='/admin/students'>
        <button type='button'>
          <img src={etudiants} />
          <span>Gestion des étudiants</span>
        </button>
      </Link>
    </li>
    <li>
      <Link to='/admin/professors'>
        <button type='button'>
          <img src={enseignants} />
          <span>Gestion des enseignants</span>
        </button>
      </Link>
    </li>
    <li>
      <Link to='/admin/optionals'>
        <button type='button'>
          <img src={optio} />
          <span>Gestion des optionnelles</span>
        </button>
      </Link>
    </li>
    <li>
      <Link to='/admin/groups'>
        <button type='button'>
          <img src={team} />
          <span>Gestion des groupes</span>
        </button>
      </Link>
    </li>
    <li>
      <Link to='/admin/sheets'>
        <button type='button'>
          <img src={emargement} />
          <span>Feuilles d'émargement</span>
        </button>
      </Link>
    </li>
  </ul>
)

export default DashboardAdmin
