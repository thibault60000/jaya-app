import React from 'react'
import PropTypes from 'prop-types'

class YearSummary extends React.Component {
  static propTypes = {
    semester1Component: PropTypes.node,
    semester2Component: PropTypes.node,
    annualComponent: PropTypes.node
  }

  static defaultProps = {
    semester1Component: <div>Semester 1</div>,
    semester2Component: <div>Semester 2</div>,
    annualComponent: <div>Annual</div>
  }

  state = {
    semester: 1
  }

  render () {
    const { semester } = this.state
    const { semester1Component, semester2Component, annualComponent } = this.props

    return (
      <section className='semesterList'>
        <div className='semesterBtns'>
          <button
            className={semester === 1 ? 'active' : ''}
            onClick={() => this._setSemester(1)}
          >
            Semestre 1
          </button>
          <button
            className={semester === 2 ? 'active' : ''}
            onClick={() => this._setSemester(2)}
          >
            Semestre 2
          </button>
          <button
            className={semester === 3 ? 'active' : ''}
            onClick={() => this._setSemester(3)}
          >
            UE Annuelles
          </button>
        </div>
        <ul>
          {semester === 1 ? semester1Component : (semester === 2 ? semester2Component : annualComponent)}
        </ul>
      </section>
    )
  }

  _setSemester = number => this.setState({ semester: number })
}

export default YearSummary
