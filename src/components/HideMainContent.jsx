'use client'
import React from 'react'
import { useSelector } from 'react-redux'
function HideMainContent({ children }) {
  let operationState = useSelector((state) => state.operationState.operationState)
  if(operationState != null) return null
  return <div className=''>{children}</div>
}

export default HideMainContent
