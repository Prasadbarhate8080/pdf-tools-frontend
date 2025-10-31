import React from 'react'

function FeaturesCard({Icon,heading,paragraph}) {
  return (
    <div className="flex flex-col gap-3  w-96">
      <div className="flex justify-center">{Icon &&<Icon strokeWidth={1} size={40} color={"black"} />}</div>
        <div><h3 className="text-md font-semibold text-gray-800 text-center">{heading}</h3></div>
        <div>
          <p className="text-center text-xs md:text-sm font-medium text-gray-800 px-4">{paragraph}
          </p>
        </div>
    </div>
  )
}

export default FeaturesCard
