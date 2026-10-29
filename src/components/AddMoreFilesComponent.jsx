'use client'

import React from 'react'
import Input from './Input'
import { toast } from 'react-toastify'

function AddMoreFilesComponent({
  setFiles,
  setImages,
  multiple = false,
  accept = '.pdf',
  images = false,
  mode = 'pdf',
}) {
  const addFiles = (e) => {
    const selectedFiles = Array.from(e.target.files || [])

    if (!selectedFiles.length) return

    let validFiles = []

    if (images || mode === 'images') {
      validFiles = selectedFiles.filter((file) =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
      )

      if (!validFiles.length) {
        toast.info('Please select JPG, PNG, or WebP images')
        e.target.value = ''
        return
      }

      setFiles((prev) =>
        multiple ? [...(prev || []), ...validFiles] : validFiles
      )

      const previews = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))

      setImages?.((prev) => [...(prev || []), ...previews])
    } else if (mode === 'excelFile') {
      validFiles = selectedFiles.filter((file) =>
        /\.(xls|xlsx|ods|csv)$/i.test(file.name)
      )

      if (!validFiles.length) {
        toast.info('Please select an Excel file (.xls, .xlsx, .ods, or .csv)')
        e.target.value = ''
        return
      }

      setFiles((prev) =>
        multiple ? [...(prev || []), ...validFiles] : validFiles[0]
      )
    } else if (mode === 'wordFile') {
      validFiles = selectedFiles.filter((file) =>
        /\.(doc|docx)$/i.test(file.name)
      )

      if (!validFiles.length) {
        toast.info('Please select a Word file (.doc or .docx)')
        e.target.value = ''
        return
      }

      setFiles((prev) =>
        multiple ? [...(prev || []), ...validFiles] : validFiles[0]
      )
    } else if (mode === 'pptFile') {
      validFiles = selectedFiles.filter((file) =>
        /\.(ppt|pptx|odp)$/i.test(file.name)
      )

      if (!validFiles.length) {
        toast.info(
          'Please select a PowerPoint file (.ppt, .pptx, or .odp)'
        )
        e.target.value = ''
        return
      }

      setFiles((prev) =>
        multiple ? [...(prev || []), ...validFiles] : validFiles[0]
      )
    } else {
      validFiles = selectedFiles.filter(
        (file) => file.type === 'application/pdf'
      )

      if (!validFiles.length) {
        toast.info('Please select a PDF file')
        e.target.value = ''
        return
      }

      setFiles((prev) =>
        multiple ? [...(prev || []), ...validFiles] : validFiles[0]
      )
    }

    e.target.value = ''
  }

  return (
    <div className="p-2">
      <div className="w-[210px] h-[290px] bg-white rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <Input
          id="addFile"
          type="file"
          labelClassName="w-11 h-11 flex justify-center items-center text-2xl font-bold bg-blue-500 text-white rounded-full shadow-md active:bg-blue-400 transition-all duration-300"
          inputClassName="hidden"
          accept={accept}
          label="+"
          multiple={multiple}
          onChange={addFiles}
        />
      </div>
    </div>
  )
}

export default AddMoreFilesComponent