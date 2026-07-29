import React from 'react'
import styles from "./Scrollbar.module.css"

function OperationMain({ children }) {
  return (
    <div className='pt-12 flex-1 h-screen'>
      <div
        className={`h-full ${styles.customScrollbar}
      overflow-auto`}
      >
        {children}
      </div>
    </div>
  )
}

export default OperationMain
