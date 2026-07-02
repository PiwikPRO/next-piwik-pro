'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const DataLayerButton: FunctionComponent = () => {
  const { DataLayer } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    // function push(data: any): any
    DataLayer.push({ data: 'data' })
  }, [])

  return (
    <button
      className='btn'
      onClick={() => {
        DataLayer.push({ data: 'data' })
        enqueueSnackbar("DataLayer.push({ data: 'data' })")
      }}
    >
      DataLayer.push
    </button>
  )
}

export default DataLayerButton
