import React from 'react'

function PageContainer({ children, isSelected, ...props }) {
  return (
    <div className={`p-2 rounded-md ${isSelected ? 'bg-gray-100' : ''}`} {...props}>
      <div
        className={`w-[210px] h-[290px] rounded-md flex relative flex-col justify-between shadow-md hover:shadow-lg
          transition-all duration-300 overflow-hidden ${isSelected ? 'bg-gray-100' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

export default PageContainer
