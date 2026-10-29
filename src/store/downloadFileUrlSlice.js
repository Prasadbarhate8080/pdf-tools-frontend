import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  downloadFileUrl: "",
}

const downloadFileUrlSlice = createSlice({
  name: 'downloadFileUrl',
  initialState,
  reducers: {
    setDownloadFileUrl: (state,action) => {
      state.downloadFileUrl = action.payload
    },
  },
})

export const { setDownloadFileUrl } = downloadFileUrlSlice.actions

export default downloadFileUrlSlice.reducer
