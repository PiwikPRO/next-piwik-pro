'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const GoalConversionsButton: FunctionComponent = () => {
  const { GoalConversions } = usePiwikPro()

  useEffect(() => {
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

export default GoalConversionsButton
