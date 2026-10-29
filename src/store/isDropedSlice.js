import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDroped: false,
}

const isDropedSlice = createSlice({
  name: 'isDroped',
  initialState,
  reducers: {
    setIsdroped: (state,action) => {
      state.isDroped = action.payload
    },
  },
})

export const { setIsdroped} = isDropedSlice.actions

export default isDropedSlice.reducer
