import React from 'react'
import PropTypes from 'prop-types'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const SortableItem = SortableElement(({ value, index }) =>
  <li>
    {value}
    <p>{index}</p>
  </li>
)

const SortableList = SortableContainer(({ choices }) => (
  <ol>
    {choices.map((choice, index) => (
      <SortableItem
        key={choice.id}
        index={index}
        value={choice.label} />
    ))}
  </ol>
))

// CLASS
class SortableSubjectList extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.arrayOf({
      id: PropTypes.string,
      label: PropTypes.string,
      rank: PropTypes.number,
      specializationSubjectId: PropTypes.string
    }),
    onSortEnd: PropTypes.func
  }

  // Fin du drag
  onSortEnd = ({ oldIndex, newIndex }) => {
    // Test
    // this.setState({
    //  ueList: arrayMove(this.state.ueList, oldIndex, newIndex)
    // })
  };

  render () {
    const { id, label, choices, onSortEnd } = this.props

    return (
      <div className='ueSelectBloc'>
        <h3>{label}</h3>
        <SortableList
          choices={choices}
          onSortEnd={({ oldIndex, newIndex }) => onSortEnd({ id, oldIndex, newIndex })}
        />
      </div>

    )
  }
}

export default SortableSubjectList
