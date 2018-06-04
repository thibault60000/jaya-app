import React from 'react'

const AddTeachingForm = ({
  subjects
}) => (
  <form>
    <div className='field has-addons'>
      <label className='label'>Nombre d'heure de cours</label>
      <p className='control'>
        <input className='input' type='number' name='lectureHours' placeholder='30...' />
      </p>
      <p className='control'>
        <a className='button is-static'>
          heures
        </a>
      </p>
    </div>

    <div className='field has-addons'>
      <label className='label'>Nombre d'heure de TD</label>
      <p className='control'>
        <input className='input' type='number' name='tutorialHours' placeholder='30...' />
      </p>
      <p className='control'>
        <a className='button is-static'>
          heures
        </a>
      </p>
    </div>

    <div className='field'>
      <label className='label'>Unité d'enseignement</label>
      <div className='control'>
        <div className='select'>
          <select name='subjectId'>
            <option value='0'>-- Selectionner une UE --</option>
            {
              subjects.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>

    <div className='field'>
      <button className='button' type='submit'>Ajouter</button>
    </div>
  </form>
)

export default AddTeachingForm
