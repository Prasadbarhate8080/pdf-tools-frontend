import { X } from 'lucide-react'
import React from 'react'

function PageContainer({
  children,
  isSelected,
  width = 210,
  height = 290,
  setFiles,
  fileIndex,
  singleFile,
  multipleFiles,
  pages,
  setImages,
  images,
  ...props
}) {
  const removeFile = () => {
    if (multipleFiles && !images) {
      setFiles((prev) => {
        let array = [...prev]
        array.splice(fileIndex, 1)
        if(array.length == 0) return null
        return array
      })
    } else if (singleFile && !images) {
      setFiles(null)
    } else if (multipleFiles && images) {
      setFiles((prev) => {
        let array = [...prev]
        array.splice(fileIndex, 1)
        if(array.length == 0) return null
        return array
      })
      setImages((prev) => {
        let array = [...prev]
        array.splice(fileIndex, 1)
        if(array.length == 0) return null
        return array
      })
    }
  }
  return (
    <div className={`p-2 rounded-md ${isSelected ? 'bg-gray-100' : ''}`} {...props}>
      <div
        className={`w-[${width + 'px'}] h-[${height + 'px'}] group  rounded-md flex relative flex-col justify-between shadow-md hover:shadow-lg
          transition-all duration-300 overflow-hidden ${isSelected ? 'bg-gray-100' : ''}`}
      >
        {!pages && (
          <div className="absolute z-20 opacity-0 group-hover:opacity-100 bg-muted p-0.5">
            <span onClick={removeFile}>
              <X />
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default PageContainer
