'use client'

import {FunctionComponent, useEffect} from 'react'
import {usePiwikPro} from '@piwikpro/next-piwik-pro'

const GoalConvetionsButton: FunctionComponent = () => {
  const {GoalConversions} = usePiwikPro()

  useEffect(() => {
    // function trackGoal(goalId: string | number, conversionValue: number, dimensions?: Object | undefined): void
    GoalConversions.trackGoal(1, 30)
  }, [])

  return (
    <button
      onClick={() => {
        GoalConversions.trackGoal(2, 40)
      }}
    >
      GoalConversions.trackGoal
    </button>
  )
}

export default GoalConvetionsButton