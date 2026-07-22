import React from 'react'

function ServerPreparingLoader() {
    return (
        <div className="flex flex-col items-center mt-8">
            <p className="text-gray-700 text-md mb-2">Preparing server ...please wait</p>
            <div className="w-15 h-15 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export default ServerPreparingLoader