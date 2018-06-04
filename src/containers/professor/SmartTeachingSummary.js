import React from 'react'
import { TeachingSummary } from '../../components/index'

const mockData = [
  { specializationLabel: 'UE1', lectureHours: 30, tutorialHours: 20 },
  { specializationLabel: 'UE2', lectureHours: 25, tutorialHours: 15 },
  { specializationLabel: 'UE3', lectureHours: 10, tutorialHours: 30 }
]

export default () => (
  <TeachingSummary professorSubjects={mockData} />
)
