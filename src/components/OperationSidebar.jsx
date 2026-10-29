import { toggleSidebar } from '@/store/sidebarSlice'
import { SidebarIcon } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function SidebarToolsButtons({ children ,className}) {
  let dispatch = useDispatch()
  return (
    <div className={`w-8 px-1 py-2 h-full bg-gray-200 items-center flex gap-2 flex-col relative ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault()
          dispatch(toggleSidebar())
        }}
        className="lg:hidden block"
      >
        <SidebarIcon />
      </button>
      {children}
    </div>
  )
}

export function SidebarToolsSection({ children }) {
  return <div className="flex-1 h-full bg-gray-100">{children}</div>
}

function OperationSidebar({ children }) {
  const isOpenSidebar = useSelector((state) => state.sidebarToggle.isOpenSidebar)
  return (
    <div
      className={`lg:static fixed top-0 z-20 lg:translate-x-0 pt-10 md:pt-12 right-0 w-80 lg:w-96 h-screen 
        transition-transform duration-300
        ${isOpenSidebar ? 'translate-x-0' : 'translate-x-[286px]'}
    `}
    >
      <div className="border-1 h-full flex">{children}</div>
    </div>
  )
}

export default OperationSidebar
