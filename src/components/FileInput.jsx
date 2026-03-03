import { CloudUpload } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

function FileInput({ setFiles, setisDroped, multiple, accept, setImages, mode = 'pdf' }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (mode == 'pdf') {
      const pdfFiles = acceptedFiles.filter((file) => file.type === 'application/pdf')
      if (multiple) setFiles((prev) => [...prev, ...pdfFiles])
      else setFiles(pdfFiles[0])
    } else if (mode == 'wordFile') {
      let fileName = acceptedFiles[0].name
      const allowedExtensions = ['.doc', '.docx']
      let isWordFile = allowedExtensions.some((ext) => fileName.endsWith(ext))
      if (isWordFile) {
        setFiles(acceptedFiles[0])
      } else {
        toast.info('please upload word file')
        return
      }
    } else if (mode == 'images') {
      const images = acceptedFiles.filter((file) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
      )
      setFiles(images)
      const imagePreviews = images.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))

      setImages((prev) => [...prev, ...imagePreviews])
    }
    setisDroped(true)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: multiple,
  })
  return (
    <div
      {...getRootProps()}
      className={`upload-zone border-2 border-dashed border-border rounded-2xl transition-all duration-300 cursor-pointer p-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center group relative
         ${isDragActive ? 'bg-[#ebf7ff]' : 'bg-[#ebf7ff]'} `}
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <CloudUpload className="w-10 h-10 text-primary-foreground" />
      </div>
      {isDragActive ? (
        <p className="  lg:block hidden text-lg font-semibold">Drop the files here ...</p>
      ) : (
        <p className=" hidden lg:block text-lg font-semibold">Drag & drop your PDF files here</p>
      )}
      <p className="text-muted-foreground text-sm">
        or{' '}
        <span className="text-primary font-medium cursor-pointer hover:underline">
          browse files
        </span>{' '}
        from your device
      </p>
      <input {...getInputProps()} type="file" name="pdf_files" />
    </div>
  )
}

export default FileInput
