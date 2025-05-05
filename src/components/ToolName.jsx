import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

function ToolName(
    {
        href,
        src,
        className,
        width=33,
        height=10,
        title="",
        alt="pdftoolify",
        setIsActiveTools,
        setIsActiveHamBurger
    }
) {
  return (
    <Link href={href} className={`${className}`}>
          <li
          onClick={() => {setIsActiveTools(false); setIsActiveHamBurger(false)}}
          className="flex gap-2 hover:bg-gray-100 px-2 py-1 rounded-md items-center">
            <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
            ></Image>
            <span>{title}</span>
          </li>
        </Link>
  )
}

export default ToolName
