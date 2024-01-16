'use client'

import React, { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const DataLayerButton: FunctionComponent = () => {
  const { DataLayer } = usePiwikPro()

  useEffect(() => {
    // function push(data: any): any
    DataLayer.push({ data: 'data' })
  }, [])

  return (
    <Button
      variant='contained'
      sx={{ mt: 2 }}
      onClick={() => {
        DataLayer.push({ data: 'data' })
      }}
    >
      DataLayer.push
    </Button>
  )
}

export default DataLayerButton
