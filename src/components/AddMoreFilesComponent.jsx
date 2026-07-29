import React from 'react'
import Input from './Input'

function AddMoreFilesComponent({addFiles}) {
  return (
    <div
      className="w-[220px] h-[300px] bg-white rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-lg
                  transition-all duration-300 overflow-hidden"
    >
      <Input
        id={'addFile'}
        type="file"
        labelClassName="w-11 h-11 flex justify-center items-center  text-2xl font-bold
                    bg-blue-500 text-white rounded-full shadow-md
                    active:bg-blue-400 transition-all duration-300"
        inputClassName="hidden"
        accept=".pdf"
        label="+"
        multiple
        onChange={addFiles}
      />
    </div>
  )
}

export default AddMoreFilesComponent
