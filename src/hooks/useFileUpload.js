import axios from "axios";
import { toast } from "react-toastify";
const { useState } = require("react");

function useFileUpload (){
  const [files, setFiles] = useState([]);
  const [isDroped, setisDroped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [downloadFileURL, setdownloadFileURL] = useState("")
  const [serverPreparing, setServerPreparing] = useState(false)
  const [progress,setProgress] = useState(0);

  const callApi = async (url,formData) => {
    try {
      console.log("call api called");
      setServerPreparing(true);
      setisUploading(true);
      const response = await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent)
            if (percent === 100) setIsProcessing(true);
            if(percent > 0) setServerPreparing(false)
          },
        })
        setServerPreparing(false)
        setisUploading(false);
        setIsProcessing(false);
        setCompletionStatus(true);
        if (response) {
          const blob = await response.data;
          const url = URL.createObjectURL(blob);
          setdownloadFileURL(url)
        } else {
          alert("Error merging PDFs");
        }
    } catch (error) {
      setServerPreparing(false)
      setisUploading(false);
      setIsProcessing(false);
      setFiles([]);
      setisDroped(false);
      setProgress(0)
      console.log(error);
      if (error.response && error.response.data instanceof Blob) {
        const blob = error.response.data;
        const text = await blob.text();
        const jsonData = JSON.parse(text);

        toast.error(jsonData.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if (error.request) {
        toast.error("No response from server, please try again later");
      }
      else {
        toast.error("An unexpected error occurred: " + error.message);
      }
    }
  }
  return {files,isDroped,isProcessing,completionStatus,isUploading,downloadFileURL,serverPreparing,progress,setCompletionStatus,setdownloadFileURL,setisDroped,setFiles,callApi}
}

export  {useFileUpload}