"use client"
import React from 'react'
import { useSelector } from 'react-redux'
function HideDefaultContent({children,className}) {
    let operationState = useSelector((state) => state.operationState.operationState)
    let states = ["waiting","inOperation","uploading","processing","faild"]
    if(states.includes(operationState)) return null
  return (
    <div className='container mx-auto pt-10'>
      {children}
    </div>
  )
}

export default HideDefaultContent
