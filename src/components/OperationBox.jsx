import React from 'react'

function OperationBox({children}) {
  return (
    <div className="mx-auto flex bg-gray-50 rounded-sm  h-screen overflow-auto relative">
        {children}
    </div>
  )
}

export default OperationBox
