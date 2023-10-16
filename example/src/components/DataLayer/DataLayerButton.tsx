'use client'

import React, {FunctionComponent, useEffect} from 'react'
import {usePiwikPro} from '@piwikpro/next-piwik-pro'

const DataLayerButton: FunctionComponent = () => {
  const {DataLayer} = usePiwikPro()

  useEffect(() => {
    // function push(data: any): any
    DataLayer.push({data: 'data'})
  }, [])

  return (
    <button
      onClick={() => {
        DataLayer.push({data: 'data'})
      }}
    >
      DataLayer.push
    </button>
  )
}

export default DataLayerButton