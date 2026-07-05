"use client"
import React from 'react'
import { useSelector } from 'react-redux'
function HideContent({children}) {
    const hideContent = useSelector((state) => state.hideContent.hideContent)
    if(hideContent) return null
  return (
    <div>
      {children}
    </div>
  )
}

export default HideContent
