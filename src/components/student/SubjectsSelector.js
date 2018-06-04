import React from 'react'
import SortableSubjectList from './SortableSubjectList'

// CLASS
class SubjectsSelector extends React.Component {
  // List Of UEs
  state = {
    ueList1: ['UE 1', 'UE 2', 'UE 3', 'UE 4', 'UE 5', 'UE 6'],
    ueList2: ['UE 7', 'UE 8', 'UE 9', 'UE 10', 'UE 11', 'UE 12'],
    ueList3: ['UE 13', 'UE 14', 'UE 15', 'UE 16', 'UE 17', 'UE 18']
  };

  render () {
    return (
      <React.Fragment>
        <SortableSubjectList ueList={this.state.ueList1} skill='Skill1' />
        <SortableSubjectList ueList={this.state.ueList2} skill='Skill2' />
        <SortableSubjectList ueList={this.state.ueList3} skill='Skill3' />
      </React.Fragment>
    )
  }
}
export default SubjectsSelector
