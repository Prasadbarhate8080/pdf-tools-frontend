import Link from 'next/link'
import React from 'react'
import { tools } from '@/data/toolsData'
function ToolList() {
  let toolArray = [];
  for(let i = 0; i < tools.length; i += 4)
  {
    toolArray.push(tools.slice(i,i + 4))
  }
  return (
    <div className="max-w-7xl mx-auto p-10  shadow-sm rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-16">
        PDFtoolify – All PDF Tools
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 sm:gap-30 w-fit mx-auto text-gray-700">
        {toolArray.map((arr,idx) => (
          <ul className="flex flex-col gap-10" key={idx}>
            {arr.map((val,index) => {
              return (
                <li key={index}>
                  <Link
                    href={val.href}
                    className={`flex items-center gap-2 hover:${val.textColor} transition cursor-pointer`}
                  >
                    <val.icon className={`${val.textColor}`} strokeWidth={0.7} /> <span>{val.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default ToolList
