'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const GoalConversionsButton: FunctionComponent = () => {
  const { GoalConversions } = usePiwikPro()

  useEffect(() => {
    GoalConversions.trackGoal(1, 30, undefined, { currencyCode: 'USD' })
  }, [])

  return (
    <Button
      variant='contained'
      sx={{ mt: 2 }}
      onClick={() => {
        GoalConversions.trackGoal(2, 40, undefined, { currencyCode: 'USD' })
      }}
    >
      GoalConversions.trackGoal
    </Button>
  )
}

export default GoalConversionsButton
