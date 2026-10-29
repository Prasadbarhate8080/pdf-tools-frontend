import React from 'react'

function BottomBar({children}) {
  return (
    <div className="absolute bottom-4 h-14 z-30 w-full flex items-center justify-center gap-4">
        {children}
    </div>
  )
}

export default BottomBar
