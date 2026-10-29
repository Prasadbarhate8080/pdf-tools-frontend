import React from 'react'
import { useSelector } from 'react-redux'

function OperationBox({children}) {
  let operationState = useSelector((state) => state.operationState.operationState)
  if(operationState == "inOperation")
  return (
    <div className="mx-auto flex bg-gray-50 rounded-sm h-screen overflow-auto relative">
        {children}
    </div>
  )
  else return null
}

export default OperationBox
