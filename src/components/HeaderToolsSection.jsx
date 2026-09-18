import React from 'react'
import ToolName from './ToolName'
import { tools } from '@/data/toolsData'

function HeaderToolsSection({ setIsActiveTools, setIsActiveHamBurger }) {
  let toolArray = []
  for (let i = 0; i < tools.length; i += 4) {
    toolArray.push(tools.slice(i, i + 4))
  }
  return (
    <div
      className="w-[750px] mx-auto p-6 bg-white rounded-2xl 
                     border border-gray-100 shadow-xl
                     animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <div className="grid grid-cols-4 gap-x-6 gap-y-1">
        {toolArray.map((val,index) => (
          <ul className="flex flex-col gap-2" key={index}>
            {
              val.map((tool,index) => <ToolName href={tool.href} title={tool.name} Icon={tool.icon} key={index}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />) 
            }
          </ul>
        ))}
      </div>
    </div>
  )
}

export default HeaderToolsSection
