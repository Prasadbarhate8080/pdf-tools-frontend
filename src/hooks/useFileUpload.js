import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import {
  resetOperationState,
  setCompleted,
  setFaild,
  setProcessing,
  setUploading,
  setWaiting,
} from '@/store/operationStateSlice'
import { setDownloadFileUrl } from '@/store/downloadFileUrlSlice'
import { setProgress } from '@/store/progressBarSlice'

function useFileUpload() {
  const [files, setFiles] = useState([])

  let dispatch = useDispatch()

  async function toolFunctionWrapper(fn) {
    try {
      dispatch(setProcessing())
      await fn()
      dispatch(setCompleted())
    } catch (error) {
      console.log(error)
      dispatch(setFaild())
      toast.error('error while processing your pdfs')
    } finally {
      // dispatch(setCompleted())
    }
  }

  const callApi = async (url, formData) => {
    try {
      dispatch(setWaiting())
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          dispatch(setProgress(percent))
          if (percent === 100) dispatch(setProcessing())
          if (percent > 0) dispatch(setUploading())
        },
      })
      dispatch(setCompleted())
      if (response) {
        const blob = await response.data
        const url = URL.createObjectURL(blob)
        dispatch(setDownloadFileUrl(url))
      } else {
        alert('Error merging PDFs')
      }
    } catch (error) {
      console.log('inside the catch block')
      dispatch(setFaild())
      console.log(error)
      if (error.response && error.response.data instanceof Blob) {
        const blob = error.response.data
        const text = await blob.text()
        const jsonData = JSON.parse(text)

        toast.error(jsonData.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else if (error.request) {
        toast.error('No response from server, please try again later')
      } else {
        toast.error('An unexpected error occurred: ' + error.message)
      }
    }
  }
  return { files, setFiles, callApi, toolFunctionWrapper }
}

export { useFileUpload }
