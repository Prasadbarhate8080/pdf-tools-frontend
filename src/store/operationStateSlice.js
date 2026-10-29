import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  operationState: null,
}

const operationStateSlice = createSlice({
  name: 'operationState',
  initialState,
  reducers: {
    resetOperationState: (state) => {
      state.operationState = null
    },
    setWaiting: (state) => {
      state.operationState = "waiting"
    },
    setInOperation: (state) => {
      state.operationState = "inOperation"
    },
    setUploading: (state) => {
      state.operationState = "uploading"
    },
    setProcessing: (state) => {
      state.operationState = "processing"
    },
    setCompleted: (state) => {
      state.operationState = "completed"
    },
    setFaild: (state) => {
      state.operationState = "faild"
    },
  },
})

export const { setCompleted,setProcessing,setUploading,setFaild,setWaiting,setInOperation,resetOperationState } = operationStateSlice.actions

export default operationStateSlice.reducer
