'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const GoalConvetionsButton: FunctionComponent = () => {
  const { GoalConversions } = usePiwikPro()

  useEffect(() => {
    // function trackGoal(goalId: string | number, conversionValue: number, dimensions?: Object | undefined): void
    GoalConversions.trackGoal(1, 30)
  }, [])

  return (
    <Button
      variant='contained'
      sx={{ mt: 2 }}
      onClick={() => {
        GoalConversions.trackGoal(2, 40)
      }}
    >
      GoalConversions.trackGoal
    </Button>
  )
}

export default GoalConvetionsButton
