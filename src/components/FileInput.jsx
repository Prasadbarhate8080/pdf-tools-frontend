import Image from 'next/image';
import React, { useCallback } from 'react'
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';

function FileInput({setFiles,setisDroped,multiple,accept,setImages,mode="pdf"
}) {

    const onDrop = useCallback((acceptedFiles) => {
    if(mode == "pdf")
    {   
        console.log(acceptedFiles)
        const pdfFiles = acceptedFiles.filter(
        (file) => file.type === "application/pdf"
        );
        if(multiple) setFiles((prev) => [...prev, ...pdfFiles]);
        else setFiles(pdfFiles[0])
    }
    else if(mode == "wordFile")
    {
        let fileName = acceptedFiles[0].name;
        const allowedExtensions = [".doc", ".docx"];
        let isWordFile = allowedExtensions.some((ext) => fileName.endsWith(ext))
        if(isWordFile)
        {
            setFiles(acceptedFiles[0])
        }
        else
        {
            toast.info("please upload word file")
            return
        }
       
    }
    else
    {
    const images = acceptedFiles.filter(
        (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)
    )
    setFiles(images)
    const imagePreviews = images.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imagePreviews]);
    }
    setisDroped(true);
    }, []);

    const { getRootProps, getInputProps, isDragActive, } = useDropzone({
        onDrop,
        accept,
        multiple: multiple,
    });
  return (
    <div
        {...getRootProps()}
        className={`lg:border-2 lg:border-dashed lg:border-[#568DF8]
        flex flex-col  items-center justify-center gap-4
        lg:rounded-3xl p-4 max-w-fit lg:h-72 cursor-pointer text-center lg:max-w-6xl mx-auto mt-10
        ${isDragActive ? "bg-[#96cdf9]" : "bg-[#90CAF9]"}`}
        >
        <div className="lg:block hidden">
            <Image
            src={"/file_upload.png"}
            height={40}
            width={50}
            alt="file upload"
            ></Image>
        </div>
        <div className="lg:hidden">
            <span
            className="px-6 py-4 text-white bg-orange-500 
            font-bold text-2xl rounded-md"
            >
            Tap to Select PDF Files
            </span>
        </div>
        <input
            {...getInputProps()}
            type="file"
            name="pdf_files"
        />
        {isDragActive ? (
            <p className="  lg:block hidden text-lg font-semibold">
            Drop the files here ...
            </p>
        ) : (
            <p className=" hidden lg:block text-lg font-semibold">
            Drag n drop some files here, or click to select files
            </p>
        )}
        </div>
  )
}

export default FileInput
