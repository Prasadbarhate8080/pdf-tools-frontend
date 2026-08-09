import React from 'react'

function PageData({data}) {
  return (
    <div className=" px-3 text-center h-10 py-2">
      <p className="text-sm font-medium truncate">
        {data}
      </p>
    </div>
  )
}

export default PageData
