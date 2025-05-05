import React from "react";
import Link from "next/link";
import Image from "next/image";
function ToolCard(
    {
        href,
        src,
        className,
        width=33,
        height=10,
        title="",
        alt="pdftoolify",
        desc=""
    }
) {
  return (
    <Link href={href}
    className={`${className}`}
    >
      <div
        className=" w-[300px] h-[130px] p-5
               bg-[#FFF]  rounded-xl hover:bg-[#F7F5FB] hover:cursor-pointer"
      >
        <div className="flex items-center">
          <div>
            <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
            ></Image>
          </div>
          <span className="font-semibold ml-2 text-sm text-gray-600">
            {title}
          </span>
        </div>
        <p
          className="text-[14px] leading-[16px] 
                text-[#777] mt-3 "
        >
          {desc}
        </p>
      </div>
    </Link>
  );
}

export default ToolCard;
