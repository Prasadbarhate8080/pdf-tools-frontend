import { toggleSidebar } from '@/store/sidebarSlice'
import { SidebarIcon } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function OperationSidebar({ children }) {
  const isOpenSidebar = useSelector((state) => state.sidebarToggle.isOpenSidebar)
  let dispatch = useDispatch()
  return (
    <div
      className={`lg:static fixed top-0 lg:translate-x-0 pt-12 right-0 w-80 lg:w-96 h-screen 
        transition-transform duration-300
        ${isOpenSidebar ? 'translate-x-0' : 'translate-x-[288px]'}
    `}
    >
      <div className="border-1 h-full flex">
        <div className="lg:hidden block w-8 p-1 h-full bg-gray-200">
          <button
            onClick={(e) => {
              e.preventDefault()
              dispatch(toggleSidebar())
            }}
            className='lg:hidden block'
          >
            <SidebarIcon />
          </button>
        </div>
        <div className="flex-1 h-full bg-gray-100">{children}</div>
      </div>
    </div>
  )
}

export default OperationSidebar
