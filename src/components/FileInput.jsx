'use client'

import { CloudUpload } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setIsdroped } from '@/store/isDropedSlice'
import { setInOperation } from '@/store/operationStateSlice'

function FileInput({
  setFiles,
  multiple = false,
  accept,
  setImages,
  mode = 'pdf',
}) {
  const dispatch = useDispatch()

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (mode === 'pdf') {
        const pdfFiles = acceptedFiles.filter(
          (file) => file.type === 'application/pdf'
        )

        if (pdfFiles.length === 0) {
          toast.info('Please upload PDF files')
          return
        }

        if (multiple) {
          setFiles((prev) => [...prev, ...pdfFiles])
        } else {
          setFiles(pdfFiles[0])
        }
      } else if (mode === 'wordFile') {
        const wordFile = acceptedFiles.find((file) =>
          /\.(doc|docx)$/i.test(file.name)
        )

        if (!wordFile) {
          toast.info('Please upload a Word file (.doc or .docx)')
          return
        }

        setFiles(wordFile)
      } else if (mode === 'excelFile') {
        const excelFile = acceptedFiles.find((file) =>
          /\.(xls|xlsx|ods|csv)$/i.test(file.name)
        )

        if (!excelFile) {
          toast.info('Please upload an Excel file (.xls, .xlsx, .ods, or .csv)')
          return
        }

        setFiles(excelFile)
      } else if (mode === 'pptFile') {
        const pptFile = acceptedFiles.find((file) =>
          /\.(ppt|pptx|odp)$/i.test(file.name)
        )

        if (!pptFile) {
          toast.info('Please upload a PowerPoint file (.ppt, .pptx, or .odp)')
          return
        }

        setFiles(pptFile)
      } else if (mode === 'images') {
        const images = acceptedFiles.filter((file) =>
          ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
            file.type
          )
        )

        if (images.length === 0) {
          toast.info('Please upload JPG, PNG, or WebP images')
          return
        }

        setFiles(images)

        const imagePreviews = images.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }))

        setImages((prev) => [...prev, ...imagePreviews])
      }

      dispatch(setIsdroped(true))
      dispatch(setInOperation())
    },
    [dispatch, setFiles, setImages, multiple, mode]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  })

  const fileTypeText = {
    pdf: 'PDF files',
    wordFile: 'Word files',
    excelFile: 'Excel files',
    pptFile: 'PowerPoint files',
    images: 'image files',
  }[mode] || 'files'

  return (
    <div
      {...getRootProps()}
      className={`upload-zone border-2 border-dashed border-border rounded-2xl transition-all duration-300 cursor-pointer p-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center group relative ${
        isDragActive ? 'bg-[#dff1ff]' : 'bg-[#ebf7ff]'
      }`}
    >
      <input {...getInputProps()} />

      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <CloudUpload className="w-10 h-10 text-primary-foreground" />
      </div>

      {isDragActive ? (
        <p className="lg:block hidden text-lg font-semibold">
          Drop the files here...
        </p>
      ) : (
        <p className="lg:block hidden text-lg font-semibold">
          Drag & drop your {fileTypeText} here
        </p>
      )}

      <p className="text-muted-foreground text-sm">
        or{' '}
        <span className="text-primary font-medium cursor-pointer hover:underline">
          browse files
        </span>{' '}
        from your device
      </p>

      {(mode === 'excelFile' || mode === 'pptFile' || mode === 'wordFile') && (
        <p className="text-muted-foreground text-xs mt-2">
          {mode === 'excelFile' && 'Supported formats: .xls, .xlsx, .ods, .csv'}
          {mode === 'pptFile' && 'Supported formats: .ppt, .pptx, .odp'}
          {mode === 'wordFile' && 'Supported formats: .doc, .docx'}
        </p>
      )}
    </div>
  )
}

export default FileInput