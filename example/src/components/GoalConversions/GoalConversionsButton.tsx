'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const GoalConversionsButton: FunctionComponent = () => {
  const { GoalConversions } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    GoalConversions.trackGoal(1, 30, undefined, { currencyCode: 'USD' })
  }, [])

  return (
    <button
      className='btn'
      onClick={() => {
        GoalConversions.trackGoal(2, 40, undefined, { currencyCode: 'USD' })
        enqueueSnackbar('GoalConversions.trackGoal(2, 40)')
      }}
    >
      GoalConversions.trackGoal
    </button>
  )
}

export default GoalConversionsButton
