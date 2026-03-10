import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

function ToolName(
  {
    href,
    className,
    title = "",
    setIsActiveTools,
    setIsActiveHamBurger,
    strokeWidth = 1,
    size = 20,
    Icon,
    iconClassName = ""
  }
) {
  return (
    <Link href={href} className={`${className} block`}>
      <li
        onClick={() => { setIsActiveTools(false); setIsActiveHamBurger(false) }}
        className="flex gap-2 px-3 py-2 rounded-lg items-center transition-all duration-200 hover:bg-gray-50 cursor-pointer">
        {Icon && <Icon strokeWidth={strokeWidth} size={16} className={`text-blue-400  ${iconClassName}`} />}
        <span className='text-sm text-gray-600 hover:text-gray-800 transition-colors'>{title}</span>
      </li>
    </Link>
  )
}

export default ToolName
