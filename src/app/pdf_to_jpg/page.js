"use client";
import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
function split() {
  const [file, setFile] = useState(null);
  const downloadRef = useRef();

  const onDrop = useCallback((acceptedFile) => {
    const pdfFiles = acceptedFile.filter(
      (file) => file.type === "application/pdf"
    );
    if (pdfFiles.length > 0) {
      setFile(pdfFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.currentTarget.pdf_file.files[0];

    console.log(file);


    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      const response = await fetch("http://localhost:8000/api/v1/pdf/pdf_to_jpg", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        downloadRef.current.innerHTML = `
          <a href="${url}" download="split.pdf" class="bg-red-500 text-white px-4 py-2 rounded-md inline-block mt-2">
           Download split PDF
          </a>`;
      } else {
        const error = await response.json();
        alert(error.error || "Error spliting PDFs");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <br />

        <div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-6 cursor-pointer text-center ${
              isDragActive ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <input
              {...getInputProps()}
              type="file"
              name="pdf_file"
              accept="application/pdf"
            />
          </div>
        </div>

        <p>{file && file.name}</p>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit
        </button>
      </form>

      <div ref={downloadRef}></div>
    </div>
  );
}

export default split;
