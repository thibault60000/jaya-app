import React from 'react'
import { Link } from 'react-router-dom'

import logoHomePage from '../../assets/img/logoHomePage.png'
import jaya from '../../assets/img/jayalogo.png'

import adminHome from '../../assets/img/adminHome.png'
import studentHome from '../../assets/img/studentHome.png'
import teacherHome from '../../assets/img/teacherHome.png'


const HomePage = () => (
  <div className='container homePage'>
    <div className='columns is-multiline has-text-centered' style={{paddingTop: '5rem'}}>
      <div className='column is-12' style={{paddingBottom: '8rem'}}>
      <div className='Logos'>
          <img src={logoHomePage} className='logoJaya' alt='Logo Jaya' />
          <img src={jaya} className='logoJaya2' alt='Jaya' />
        </div>
      </div>

      <div className='column is-one-third has-text-centered'>
        <Link to='/connection/admin'>
          <button className='buttonAdminHome'><img src={adminHome} /><span>Administrateur</span></button>
        </Link>
      </div>

      <div className='column is-one-third has-text-centered'>
        <Link to='/connection/student'>
          <button className='buttonEtudiantHome'><img src={studentHome} /><span>Etudiant</span></button>
        </Link>
      </div>

      <div className='column is-one-third has-text-centered'>
        <Link to='/connection/professor'>
          <button className='buttonProfHome'><img src={teacherHome} /><span>Enseignant</span></button>
        </Link>
      </div>
    </div>
  </div>
)

export default HomePage
