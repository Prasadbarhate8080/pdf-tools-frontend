import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

function ToolName(
    {
        href,
        className,
        title="",
        setIsActiveTools,
        setIsActiveHamBurger,
        strokeWidth=1,
        size=20,
        Icon,
        iconClassName=""
    }
) {
  return (
    <Link href={href} className={`${className}`}>
          <li
          onClick={() => {setIsActiveTools(false); setIsActiveHamBurger(false)}}
          className="flex gap-1  px-2 py-1 rounded-md items-center">
            {Icon && <Icon strokeWidth={strokeWidth} size={size} className={`${iconClassName}`}/>}
            <span className='text-sm hover:text-blue-500'>{title}</span>
          </li>
        </Link>
  )
}

export default ToolName
